const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// generate token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ADMIN LOGIN
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = generateToken({ role: "admin", email });
  res.json({ token, role: "admin", message: "Admin login successful" });
};

// CUSTOMER SIGNUP
const customerSignup = async (req, res) => {
  const { fullName, email, password, phone, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      role: "customer",
    });

    const token = generateToken({ id: user._id, role: "customer" });
    res.status(201).json({ token, role: "customer", message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// COMMON LOGIN (artist, customer, delivery)
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = generateToken({ id: user._id, role: user.role });
    res.json({ token, role: user.role, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { adminLogin, customerSignup, userLogin };