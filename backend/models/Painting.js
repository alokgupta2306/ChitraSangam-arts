const mongoose = require("mongoose");

const paintingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artistName: {
      type: String,
    },
    style: {
      type: String,
    },
    dimensions: {
      type: String,
    },
    medium: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    buyPrice: {
      type: Number,
      required: true,
    },
    artistShare: {
      type: Number,
      required: true,
    },
    rentPricePerDay: {
      type: Number,
      default: 0,
    },
    depositAmount: {
      type: Number,
      default: 0,
    },
    quantityInStock: {
      type: Number,
      default: 1,
    },
    availableFor: {
      type: String,
      enum: ["buy", "rent", "both"],
      default: "both",
    },
    status: {
      type: String,
      enum: ["available", "sold", "rented"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Painting", paintingSchema);