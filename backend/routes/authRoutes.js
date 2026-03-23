const express = require("express");
const router = express.Router();
const { adminLogin, customerSignup, userLogin } = require("../controllers/authController");

// admin login
router.post("/admin/login", adminLogin);

// customer signup
router.post("/signup", customerSignup);

// all users login
router.post("/login", userLogin);

module.exports = router;