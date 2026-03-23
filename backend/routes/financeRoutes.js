const express = require("express");
const router = express.Router();
const { getFinanceTally } = require("../controllers/financeController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/tally", protect, adminOnly, getFinanceTally);

module.exports = router;