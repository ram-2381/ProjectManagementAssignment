const User = require("../models/User");
const Assignment = require("../models/Assignment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validation = require("../helpers/validation");

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Validate using the Joi schema
    const { error } = validation.register.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = validation.login.validate(req.body); // Change 'err' to 'error'

    if (error) {
      return res.status(400).json({ message: error.details[0].message }); // Use 'error' here too
    }
    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: existingUser.id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.expiresIn }
    );

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload an assignment
const uploadAssignment = async (req, res) => {
  const { task, admin } = req.body;
  try {
    const newAssignment = new Assignment({ userId: req.user.id, task, admin });
    await newAssignment.save();
    res.status(201).json({ message: "Assignment uploaded successfully" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }, "name email");
    res.status(200).json({ admins });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching Admins", err: err.message });
  }
};

module.exports = { register, login, uploadAssignment, getAllAdmins };
