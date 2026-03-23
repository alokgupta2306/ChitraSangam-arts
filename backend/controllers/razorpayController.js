const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Painting = require("../models/Painting");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE RAZORPAY ORDER
const createRazorpayOrder = async (req, res) => {
  const { paintingId, orderType, rentDays } = req.body;

  try {
    const painting = await Painting.findById(paintingId);
    if (!painting) {
      return res.status(404).json({ message: "Painting not found" });
    }

    let amount = 0;
    if (orderType === "buy") {
      amount = (painting.buyPrice + 30) * 100; // in paise
    } else if (orderType === "rent") {
      amount = (painting.rentPricePerDay * rentDays + painting.depositAmount + 30) * 100;
    }

    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      paintingTitle: painting.title,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY PAYMENT AND PLACE ORDER
const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paintingId,
    orderType,
    deliveryAddress,
    rentDays,
  } = req.body;

  try {
    // verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // payment verified - place order
    const painting = await Painting.findById(paintingId);

    let totalAmount = 0;
    let depositAmount = 0;
    let rentStartDate = null;
    let rentEndDate = null;

    if (orderType === "buy") {
      totalAmount = painting.buyPrice + 30;
    } else if (orderType === "rent") {
      totalAmount = painting.rentPricePerDay * rentDays + painting.depositAmount + 30;
      depositAmount = painting.depositAmount;
      rentStartDate = new Date();
      rentEndDate = new Date();
      rentEndDate.setDate(rentEndDate.getDate() + rentDays);
    }

    const razorpayFee = parseFloat((painting.buyPrice * 0.02).toFixed(2));
    const adminProfit = totalAmount - painting.artistShare - 30 - razorpayFee;

    const order = await Order.create({
      customerId: req.user.id,
      paintingId,
      orderType,
      totalAmount,
      artistShare: painting.artistShare,
      deliveryCharge: 30,
      razorpayFee,
      adminProfit,
      deliveryAddress,
      paymentMethod: "online",
      rentDays,
      rentStartDate,
      rentEndDate,
      depositAmount,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    res.status(201).json({
      message: "Payment successful and order placed!",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRazorpayOrder, verifyPayment };