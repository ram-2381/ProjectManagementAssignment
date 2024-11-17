const express = require("express");
const user = require("../controllers/userController");
const authmiddleware = require("../middleware/authMiddleware");
const router = express.Router();


// User Registration route
router.post("/register", user.register);

// User Login route
router.post("/login", user.login);

// Upload Assignment (Protected route)
router.post("/upload", authmiddleware, user.uploadAssignment);

// Get all admins (Protected route)
router.get("/admins", authmiddleware, user.getAllAdmins);

module.exports = router;