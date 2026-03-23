const mongoose = require("mongoose");

const joinApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
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
    roleApplied: {
      type: String,
      enum: ["artist", "delivery"],
      required: true,
    },
    // artist fields
    paintingStyles: {
      type: [String],
      default: [],
    },
    availability: {
      type: String,
      enum: ["full-time", "part-time"],
    },
    // delivery fields
    vehicleType: {
      type: String,
      enum: ["bike", "cycle", "car", "foot"],
    },
    coverageArea: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JoinApplication", joinApplicationSchema);