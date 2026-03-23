const CustomOrder = require("../models/CustomOrder");

// CUSTOMER PLACES CUSTOM ORDER
const placeCustomOrder = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    address,
    paintingType,
    description,
    referencePhotoUrl,
    surface,
    sizeDetails,
    colorMedium,
    frameRequired,
    frameType,
    deliveryAddress,
    requiredByDate,
    additionalNotes,
  } = req.body;

  try {
    const customOrder = await CustomOrder.create({
      customerId: req.user.id,
      fullName,
      email,
      phone,
      address,
      paintingType,
      description,
      referencePhotoUrl,
      surface,
      sizeDetails,
      colorMedium,
      frameRequired,
      frameType,
      deliveryAddress,
      requiredByDate,
      additionalNotes,
    });

    res.status(201).json({ message: "Custom order placed successfully", customOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL CUSTOM ORDERS (admin)
const getAllCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find()
      .populate("customerId", "fullName email")
      .populate("assignedArtistId", "fullName email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN ASSIGNS ARTIST TO CUSTOM ORDER
const assignArtistToCustomOrder = async (req, res) => {
  const { assignedArtistId } = req.body;

  try {
    const order = await CustomOrder.findByIdAndUpdate(
      req.params.id,
      { assignedArtistId, status: "assigned" },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Custom order not found" });
    }
    res.json({ message: "Artist assigned to custom order", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY CUSTOM ORDERS (customer)
const getMyCustomOrders = async (req, res) => {
  try {
    const orders = await CustomOrder.find({ customerId: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeCustomOrder,
  getAllCustomOrders,
  assignArtistToCustomOrder,
  getMyCustomOrders,
};