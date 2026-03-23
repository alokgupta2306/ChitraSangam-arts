const express = require("express");
const router = express.Router();
const {
  addPainting,
  getAllPaintings,
  getSinglePainting,
  updatePainting,
  deletePainting,
} = require("../controllers/paintingController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// public
router.get("/", getAllPaintings);
router.get("/:id", getSinglePainting);

// admin only
router.post("/", protect, adminOnly, addPainting);
router.put("/:id", protect, adminOnly, updatePainting);
router.delete("/:id", protect, adminOnly, deletePainting);

module.exports = router;