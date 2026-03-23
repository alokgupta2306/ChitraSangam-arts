const Order = require("../models/Order");
const Painting = require("../models/Painting");

// PLACE ORDER (customer)
const placeOrder = async (req, res) => {
  const {
    paintingId,
    orderType,
    deliveryAddress,
    paymentMethod,
    rentDays,
  } = req.body;

  try {
    const painting = await Painting.findById(paintingId);
    if (!painting) {
      return res.status(404).json({ message: "Painting not found" });
    }

    let totalAmount = 0;
    let depositAmount = 0;
    let rentStartDate = null;
    let rentEndDate = null;

    if (orderType === "buy") {
      totalAmount = painting.buyPrice + 30; // base delivery charge
    } else if (orderType === "rent") {
      if (!rentDays) {
        return res.status(400).json({ message: "rentDays is required for rent orders" });
      }
      totalAmount = painting.rentPricePerDay * rentDays + painting.depositAmount + 30;
      depositAmount = painting.depositAmount;
      rentStartDate = new Date();
      rentEndDate = new Date();
      rentEndDate.setDate(rentEndDate.getDate() + rentDays);
    }

    // razorpay fee approx 2%
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
      paymentMethod: paymentMethod || "online",
      rentDays,
      rentStartDate,
      rentEndDate,
      depositAmount,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY ORDERS (customer)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id })
      .populate("paintingId", "title imageUrl buyPrice")
      .populate("deliveryPartnerId", "fullName phone");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ORDERS (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId", "fullName email phone")
      .populate("paintingId", "title buyPrice")
      .populate("deliveryPartnerId", "fullName phone");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE ORDER STATUS (admin)
const updateOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ASSIGN DELIVERY PARTNER (admin)
const assignDeliveryPartner = async (req, res) => {
  const { deliveryPartnerId } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryPartnerId, orderStatus: "out_for_delivery" },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Delivery partner assigned", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// COD CASH COLLECTED (delivery partner)
const codCashCollected = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        codStatus: "collected",
        codCollectedBy: req.user.id,
        codCollectedAt: new Date(),
      },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Cash collected recorded", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN CONFIRMS COD RECEIVED
const adminConfirmCOD = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        codReceivedByAdmin: true,
        codStatus: "submitted_to_admin",
      },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "COD confirmed by admin", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  assignDeliveryPartner,
  codCashCollected,
  adminConfirmCOD,
};