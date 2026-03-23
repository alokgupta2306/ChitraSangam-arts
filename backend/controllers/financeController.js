const Order = require("../models/Order");

// FINANCE TALLY (admin only)
const getFinanceTally = async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: "delivered" });

    let totalCollected = 0;
    let totalArtistShare = 0;
    let totalDeliveryCharge = 0;
    let totalRazorpayFee = 0;
    let totalAdminProfit = 0;
    let totalCODPending = 0;
    let totalCODReceived = 0;

    orders.forEach((order) => {
      totalCollected += order.totalAmount || 0;
      totalArtistShare += order.artistShare || 0;
      totalDeliveryCharge += order.deliveryCharge || 0;
      totalRazorpayFee += order.razorpayFee || 0;
      totalAdminProfit += order.adminProfit || 0;

      if (order.paymentMethod === "cod") {
        if (order.codReceivedByAdmin) {
          totalCODReceived += order.totalAmount || 0;
        } else {
          totalCODPending += order.totalAmount || 0;
        }
      }
    });

    res.json({
      totalOrders: orders.length,
      totalCollected,
      totalArtistShare,
      totalDeliveryCharge,
      totalRazorpayFee,
      totalAdminProfit,
      totalCODPending,
      totalCODReceived,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFinanceTally };