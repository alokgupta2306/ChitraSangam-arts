const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["artist", "customer", "delivery"],
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    // only for artist
    paintingStyles: {
      type: [String],
      default: [],
    },
    // only for delivery partner
    vehicleType: {
      type: String,
      enum: ["bike", "cycle", "car", "foot"],
    },
    availability: {
      type: String,
      enum: ["full-time", "part-time"],
    },
    addedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);