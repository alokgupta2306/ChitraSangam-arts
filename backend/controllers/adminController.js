const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ADD ARTIST
const addArtist = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    address,
    gender,
    dateOfBirth,
    paintingStyles,
    availability,
  } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Artist already exists" });
    }

    const hashedPassword = await bcrypt.hash(phone, 10);

    const artist = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      gender,
      dateOfBirth,
      paintingStyles,
      availability,
      role: "artist",
      addedByAdmin: true,
    });

    res.status(201).json({ message: "Artist added successfully", artist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD DELIVERY PARTNER
const addDeliveryPartner = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    address,
    gender,
    dateOfBirth,
    vehicleType,
    availability,
  } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Delivery partner already exists" });
    }

    const hashedPassword = await bcrypt.hash(phone, 10);

    const partner = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      gender,
      dateOfBirth,
      vehicleType,
      availability,
      role: "delivery",
      addedByAdmin: true,
    });

    res.status(201).json({ message: "Delivery partner added successfully", partner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ARTISTS
const getAllArtists = async (req, res) => {
  try {
    const artists = await User.find({ role: "artist" }).select("-password");
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL DELIVERY PARTNERS
const getAllDeliveryPartners = async (req, res) => {
  try {
    const partners = await User.find({ role: "delivery" }).select("-password");
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE A USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addArtist,
  addDeliveryPartner,
  getAllArtists,
  getAllDeliveryPartners,
  deleteUser,
};