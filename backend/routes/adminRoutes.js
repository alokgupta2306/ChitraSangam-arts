const express = require("express");
const router = express.Router();
const {
  addArtist,
  addDeliveryPartner,
  getAllArtists,
  getAllDeliveryPartners,
  deleteUser,
} = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/add-artist", protect, adminOnly, addArtist);
router.post("/add-delivery", protect, adminOnly, addDeliveryPartner);
router.get("/artists", protect, adminOnly, getAllArtists);
router.get("/delivery-partners", protect, adminOnly, getAllDeliveryPartners);
router.delete("/delete-user/:id", protect, adminOnly, deleteUser);

module.exports = router;