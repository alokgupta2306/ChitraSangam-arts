const express = require("express");
const router = express.Router();
const {
  getPendingDeliveryOrders,
  getAssignedOrders,
  getAvailableDeliveryPartners,
  assignDelivery,
} = require("../controllers/assignDeliveryController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// all admin only
router.get("/pending", protect, adminOnly, getPendingDeliveryOrders);
router.get("/assigned", protect, adminOnly, getAssignedOrders);
router.get("/delivery-partners", protect, adminOnly, getAvailableDeliveryPartners);
router.post("/assign", protect, adminOnly, assignDelivery);

module.exports = router;