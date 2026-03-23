const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

const artistOnly = (req, res, next) => {
  if (req.user.role !== "artist") {
    return res.status(403).json({ message: "Artist access only" });
  }
  next();
};

const customerOnly = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ message: "Customer access only" });
  }
  next();
};

const deliveryOnly = (req, res, next) => {
  if (req.user.role !== "delivery") {
    return res.status(403).json({ message: "Delivery partner access only" });
  }
  next();
};

module.exports = { protect, adminOnly, artistOnly, customerOnly, deliveryOnly };