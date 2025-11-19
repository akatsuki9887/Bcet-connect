// backend/src/modules/auth/auth.controller.js
const { registerSchema, loginSchema } = require("./auth.validation");
const authService = require("./auth.service");
const User = require("../user/user.model"); // User model import

// ---------------- REGISTER ----------------
exports.register = async (req, res, next) => {
  try {
    // Validate input
    const value = await registerSchema.validateAsync(req.body);

    // Service call
    const user = await authService.register(value);

    // Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    next(err); // go to errorHandler
  }
};

// ---------------- LOGIN ----------------
exports.login = async (req, res, next) => {
  try {
    // Validate input
    const value = await loginSchema.validateAsync(req.body);

    // Service call
    const result = await authService.login(value);

    res.json({
      success: true,
      message: "Login successful",
      data: result, // { user, token }
    });
  } catch (err) {
    next(err);
  }
};

// ---------------- ME (Current User) ----------------
exports.me = async (req, res, next) => {
  try {
    // req.user.id authMiddleware ne set kiya hai
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Current user fetched",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
