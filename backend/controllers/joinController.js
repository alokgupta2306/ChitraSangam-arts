const JoinApplication = require("../models/JoinApplication");

// ANYONE CAN SUBMIT APPLICATION (public)
const submitApplication = async (req, res) => {
  const {
    fullName,
    dateOfBirth,
    email,
    phone,
    address,
    roleApplied,
    paintingStyles,
    availability,
    vehicleType,
    coverageArea,
  } = req.body;

  try {
    const application = await JoinApplication.create({
      fullName,
      dateOfBirth,
      email,
      phone,
      address,
      roleApplied,
      paintingStyles,
      availability,
      vehicleType,
      coverageArea,
    });

    res.status(201).json({
      message: "Thank you for applying. We will contact you shortly.",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL APPLICATIONS (admin only)
const getAllApplications = async (req, res) => {
  try {
    const applications = await JoinApplication.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE APPLICATION STATUS (admin only)
const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const application = await JoinApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json({ message: "Application status updated", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
};