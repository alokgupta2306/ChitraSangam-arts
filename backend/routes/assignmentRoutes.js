const express = require("express");
const router = express.Router();
const {
  assignWork,
  getMyAssignments,
  submitWork,
  approveWork,
  getAllAssignments,
} = require("../controllers/assignmentController");
const { protect, adminOnly, artistOnly } = require("../middleware/authMiddleware");

// admin
router.post("/", protect, adminOnly, assignWork);
router.get("/all", protect, adminOnly, getAllAssignments);
router.put("/approve/:id", protect, adminOnly, approveWork);

// artist
router.get("/my", protect, artistOnly, getMyAssignments);
router.put("/submit/:id", protect, artistOnly, submitWork);

module.exports = router;