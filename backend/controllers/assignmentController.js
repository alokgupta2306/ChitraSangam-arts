const Assignment = require("../models/Assignment");

// ADMIN ASSIGNS WORK TO ARTIST
const assignWork = async (req, res) => {
  const { artistId, topic, paintingStyle, notes, dueDate } = req.body;

  try {
    const assignment = await Assignment.create({
      artistId,
      topic,
      paintingStyle,
      notes,
      dueDate,
    });

    res.status(201).json({ message: "Work assigned successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ARTIST GETS THEIR ASSIGNMENTS
const getMyAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ artistId: req.user.id });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ARTIST SUBMITS COMPLETED WORK
const submitWork = async (req, res) => {
  const { submittedImageUrl } = req.body;

  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (assignment.artistId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your assignment" });
    }

    assignment.submittedImageUrl = submittedImageUrl;
    assignment.submittedAt = new Date();
    assignment.status = "completed";
    await assignment.save();

    res.json({ message: "Work submitted successfully", assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN APPROVES SUBMITTED WORK
const approveWork = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { approvedByAdmin: true },
      { new: true }
    );
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json({ message: "Work approved", assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ASSIGNMENTS (admin)
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().populate(
      "artistId",
      "fullName email"
    );
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  assignWork,
  getMyAssignments,
  submitWork,
  approveWork,
  getAllAssignments,
};