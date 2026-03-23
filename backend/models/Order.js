const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paintingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Painting",
      required: true,
    },
    orderType: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    artistShare: {
      type: Number,
    },
    deliveryCharge: {
      type: Number,
      default: 30,
    },
    razorpayFee: {
      type: Number,
    },
    adminProfit: {
      type: Number,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderStatus: {
      type: String,
      enum: [
        "placed",
        "assigned_to_artist",
        "painting_completed",
        "out_for_delivery",
        "delivered",
      ],
      default: "placed",
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cod"],
      default: "online",
    },
    codStatus: {
      type: String,
      enum: ["pending", "collected", "submitted_to_admin"],
      default: "pending",
    },
    codCollectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    codCollectedAt: {
      type: Date,
    },
    codReceivedByAdmin: {
      type: Boolean,
      default: false,
    },
    estimatedDelivery: {
      type: Date,
    },
    actualDelivery: {
      type: Date,
    },
    qrCode: {
      type: String,
    },
    rentDays: {
      type: Number,
    },
    rentStartDate: {
      type: Date,
    },
    rentEndDate: {
      type: Date,
    },
    depositAmount: {
      type: Number,
    },
    depositRefunded: {
      type: Boolean,
      default: false,
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);