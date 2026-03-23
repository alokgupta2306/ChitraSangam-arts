const Order = require("../models/Order");
const crypto = require("crypto");

// GENERATE QR CODE FOR ORDER (admin assigns delivery)
const generateQRCode = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // simple unique token for QR
    const qrToken = crypto.randomBytes(16).toString("hex");
    order.qrCode = qrToken;
    await order.save();

    res.json({ message: "QR code generated", qrCode: qrToken, orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CUSTOMER SCANS QR - CONFIRM DELIVERY
const confirmDeliveryByQR = async (req, res) => {
  const { qrCode } = req.body;

  try {
    const order = await Order.findOne({ qrCode });
    if (!order) {
      return res.status(404).json({ message: "Invalid QR code" });
    }

    if (order.orderStatus === "delivered") {
      return res.status(400).json({ message: "Order already delivered" });
    }

    if (order.customerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "This is not your order" });
    }

    order.orderStatus = "delivered";
    order.actualDelivery = new Date();
    order.qrCode = null; // QR used - make it invalid now
    await order.save();

    res.json({ message: "Delivery confirmed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET DELIVERY PARTNER ORDERS
const getMyDeliveries = async (req, res) => {
  try {
    const orders = await Order.find({ deliveryPartnerId: req.user.id })
      .populate("customerId", "fullName phone address")
      .populate("paintingId", "title imageUrl");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELIVERY HISTORY
const getDeliveryHistory = async (req, res) => {
  try {
    const orders = await Order.find({
      deliveryPartnerId: req.user.id,
      orderStatus: "delivered",
    }).populate("customerId", "fullName").populate("paintingId", "title");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateQRCode,
  confirmDeliveryByQR,
  getMyDeliveries,
  getDeliveryHistory,
};