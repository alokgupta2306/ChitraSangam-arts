const express = require("express");
const router = express.Router();
const {
  generateQRCode,
  confirmDeliveryByQR,
  getMyDeliveries,
  getDeliveryHistory,
} = require("../controllers/deliveryController");
const {
  protect,
  adminOnly,
  customerOnly,
  deliveryOnly,
} = require("../middleware/authMiddleware");

// admin generates QR for order
router.put("/generate-qr/:id", protect, adminOnly, generateQRCode);

// customer scans QR to confirm delivery
router.put("/confirm-delivery", protect, customerOnly, confirmDeliveryByQR);

// delivery partner
router.get("/my-deliveries", protect, deliveryOnly, getMyDeliveries);
router.get("/history", protect, deliveryOnly, getDeliveryHistory);

module.exports = router;