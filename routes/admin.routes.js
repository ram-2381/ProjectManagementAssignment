const express = require("express");
const admin = require("../controllers/adminController");
const authmiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Get all assignments tagged to the admin (Protected route)
router.get("/assignments", authmiddleware, admin.getAssignments);

// Accept an assignment by ID (Protected route)
router.post("/assignment/:id/accept", authmiddleware, admin.acceptAssignment);

// Reject an assignment by ID (Protected route)
router.post("/assignment/:id/reject", authmiddleware, admin.rejectAssignment);

module.exports = router;
