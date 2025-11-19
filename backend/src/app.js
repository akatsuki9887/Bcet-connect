// backend/src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const { PORT } = require("./config/env");
const errorHandler = require("./middleware/errorHandler"); // ✅ NEW

const app = express();

// =======================
// Middlewares
// =======================
app.use(cors());               // Allow CORS (frontend requests)
app.use(express.json());       // Parse JSON body
app.use(morgan("dev"));        // Request logging

// =======================
// Health check route
// =======================
app.get("/", (req, res) => {
  res.send(`BCET CONNECT API running on port ${PORT}`);
});

// =======================
// API routes
// =======================
app.use("/api", routes);

// =======================
// Error handler middleware (last me hi rehna chahiye)
// =======================
app.use(errorHandler);         // ✅ Centralized error handler

module.exports = app;
