const Assignment = require("../models/Assignment");

// Get all assignments tagged to the admin
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user.id });
    res.status(200).json({ assignments });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Accept an assignment by ID
const acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    assignment.status = "accepted";
    await assignment.save();
    res.status(200).json({ message: "Assignment accepted" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Reject an assignment by ID
const rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    assignment.status = "rejected";
    await assignment.save();
    res.status(200).json({ message: "Assignment rejected" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { getAssignments, acceptAssignment, rejectAssignment };
