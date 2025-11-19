const ApiError = require("../utils/ApiError");

module.exports = (err, req, res, next) => {
  console.error("❌ ERROR:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
