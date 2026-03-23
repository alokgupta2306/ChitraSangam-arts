const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  assignDeliveryPartner,
  codCashCollected,
  adminConfirmCOD,
} = require("../controllers/orderController");
const {
  protect,
  adminOnly,
  customerOnly,
  deliveryOnly,
} = require("../middleware/authMiddleware");

// customer
router.post("/", protect, customerOnly, placeOrder);
router.get("/my-orders", protect, customerOnly, getMyOrders);

// admin
router.get("/all", protect, adminOnly, getAllOrders);
router.put("/status/:id", protect, adminOnly, updateOrderStatus);
router.put("/assign-delivery/:id", protect, adminOnly, assignDeliveryPartner);
router.put("/confirm-cod/:id", protect, adminOnly, adminConfirmCOD);

// delivery partner
router.put("/cod-collected/:id", protect, deliveryOnly, codCashCollected);

module.exports = router;