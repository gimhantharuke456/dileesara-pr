// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const appointmentRoutes = require("./routes/appointmentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/appointmentDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/payments", paymentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
