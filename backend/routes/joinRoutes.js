const express = require("express");
const router = express.Router();
const {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
} = require("../controllers/joinController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// public - anyone can apply
router.post("/apply", submitApplication);

// admin only
router.get("/all", protect, adminOnly, getAllApplications);
router.put("/status/:id", protect, adminOnly, updateApplicationStatus);

module.exports = router;