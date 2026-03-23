const express = require("express");
const router = express.Router();
const {
  placeCustomOrder,
  getAllCustomOrders,
  assignArtistToCustomOrder,
  getMyCustomOrders,
} = require("../controllers/customOrderController");
const { protect, adminOnly, customerOnly } = require("../middleware/authMiddleware");

// customer
router.post("/", protect, customerOnly, placeCustomOrder);
router.get("/my", protect, customerOnly, getMyCustomOrders);

// admin
router.get("/all", protect, adminOnly, getAllCustomOrders);
router.put("/assign-artist/:id", protect, adminOnly, assignArtistToCustomOrder);

module.exports = router;