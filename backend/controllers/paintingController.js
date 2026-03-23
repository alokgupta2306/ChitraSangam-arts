const Painting = require("../models/Painting");

// ADD PAINTING (admin only)
const addPainting = async (req, res) => {
  const {
    title,
    description,
    artistId,
    artistName,
    style,
    dimensions,
    medium,
    imageUrl,
    buyPrice,
    artistShare,
    rentPricePerDay,
    depositAmount,
    quantityInStock,
    availableFor,
  } = req.body;

  try {
    const painting = await Painting.create({
      title,
      description,
      artistId,
      artistName,
      style,
      dimensions,
      medium,
      imageUrl,
      buyPrice,
      artistShare,
      rentPricePerDay,
      depositAmount,
      quantityInStock,
      availableFor,
    });

    res.status(201).json({ message: "Painting added successfully", painting });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PAINTINGS (public)
const getAllPaintings = async (req, res) => {
  try {
    const paintings = await Painting.find({ status: "available" });
    res.json(paintings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PAINTING
const getSinglePainting = async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (!painting) {
      return res.status(404).json({ message: "Painting not found" });
    }
    res.json(painting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PAINTING (admin only)
const updatePainting = async (req, res) => {
  try {
    const painting = await Painting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!painting) {
      return res.status(404).json({ message: "Painting not found" });
    }
    res.json({ message: "Painting updated", painting });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PAINTING (admin only)
const deletePainting = async (req, res) => {
  try {
    const painting = await Painting.findByIdAndDelete(req.params.id);
    if (!painting) {
      return res.status(404).json({ message: "Painting not found" });
    }
    res.json({ message: "Painting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPainting,
  getAllPaintings,
  getSinglePainting,
  updatePainting,
  deletePainting,
};