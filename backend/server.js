const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://chitrasangam-arts.netlify.app",
  ],
  credentials: true,
}));

app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paintingRoutes = require("./routes/paintingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const customOrderRoutes = require("./routes/customOrderRoutes");
const financeRoutes = require("./routes/financeRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const joinRoutes = require("./routes/joinRoutes");
const assignDeliveryRoutes = require("./routes/assignDeliveryRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/paintings", paintingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/custom-orders", customOrderRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/join", joinRoutes);
app.use("/api/assign-delivery", assignDeliveryRoutes);

app.get("/", (req, res) => {
  res.send("ChitraSangam Arts API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});