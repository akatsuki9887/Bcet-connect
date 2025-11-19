// backend/src/modules/user/user.controller.js
const userService = require("./user.service");

// GET /api/user/me  → current logged in user ka profile
exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfileById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/user/me  → update current user profile
exports.updateMyProfile = async (req, res, next) => {
  try {
    const updated = await userService.updateProfile(req.user.id, req.body);

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/user/:id  → kisi bhi user ka public profile
exports.getPublicProfile = async (req, res, next) => {
  try {
    const user = await userService.getPublicProfile(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
