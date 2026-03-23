const mongoose = require("mongoose");

const customOrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    paintingType: {
      type: String,
    },
    description: {
      type: String,
    },
    referencePhotoUrl: {
      type: String,
    },
    surface: {
      type: String,
      enum: ["canvas", "paper"],
    },
    sizeDetails: {
      type: String,
    },
    colorMedium: {
      type: String,
    },
    frameRequired: {
      type: Boolean,
      default: false,
    },
    frameType: {
      type: String,
    },
    deliveryAddress: {
      type: String,
    },
    requiredByDate: {
      type: Date,
    },
    additionalNotes: {
      type: String,
    },
    assignedArtistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "assigned", "inProgress", "completed", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomOrder", customOrderSchema);