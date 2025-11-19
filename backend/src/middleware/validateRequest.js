const ApiError = require("../utils/ApiError");

module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(new ApiError(400, err.message));
  }
};
