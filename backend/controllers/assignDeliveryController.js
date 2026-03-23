const Order = require("../models/Order");
const User = require("../models/User");
const crypto = require("crypto");

// GET all pending orders (no delivery partner assigned yet)
const getPendingDeliveryOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      orderStatus: { $in: ["placed", "approved"] },
      deliveryPartnerId: { $exists: false },
    })
      .populate("customerId", "fullName phone address")
      .populate("paintingId", "title imageUrl buyPrice");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all assigned orders (delivery partner assigned)
const getAssignedOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      orderStatus: "out_for_delivery",
      deliveryPartnerId: { $exists: true },
    })
      .populate("customerId", "fullName phone address")
      .populate("paintingId", "title imageUrl")
      .populate("deliveryPartnerId", "fullName phone vehicleType");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET available delivery partners with active delivery count
const getAvailableDeliveryPartners = async (req, res) => {
  try {
    const partners = await User.find({ role: "delivery" }).select("-password");

    // count active deliveries for each partner
    const partnersWithCount = await Promise.all(
      partners.map(async (partner) => {
        const activeCount = await Order.countDocuments({
          deliveryPartnerId: partner._id,
          orderStatus: "out_for_delivery",
        });
        return {
          ...partner.toObject(),
          activeDeliveries: activeCount,
        };
      })
    );

    res.json(partnersWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST assign delivery partner to order
const assignDelivery = async (req, res) => {
  const { orderId, deliveryPartnerId, deadline } = req.body;

  try {
    // generate unique QR code
    const qrCode = crypto.randomBytes(16).toString("hex");

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        deliveryPartnerId,
        orderStatus: "out_for_delivery",
        estimatedDelivery: deadline,
        qrCode,
      },
      { new: true }
    )
      .populate("customerId", "fullName phone")
      .populate("paintingId", "title")
      .populate("deliveryPartnerId", "fullName phone");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Delivery partner assigned successfully",
      order,
      qrCode,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPendingDeliveryOrders,
  getAssignedOrders,
  getAvailableDeliveryPartners,
  assignDelivery,
};