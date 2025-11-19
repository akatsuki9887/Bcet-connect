const ApiError = require("../utils/ApiError");

module.exports = function roleMiddleware(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied: insufficient permissions"));
    }
    next();
  };
};
