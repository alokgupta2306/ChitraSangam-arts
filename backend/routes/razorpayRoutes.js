const express = require("express");
const router = express.Router();
const { createRazorpayOrder, verifyPayment } = require("../controllers/razorpayController");
const { protect, customerOnly } = require("../middleware/authMiddleware");

router.post("/create-order", protect, customerOnly, createRazorpayOrder);
router.post("/verify-payment", protect, customerOnly, verifyPayment);

module.exports = router;