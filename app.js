require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./services/db");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/v1', require("./routes/index.routes"))

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Is Running on port ${PORT}`)
    connectDB()
})
