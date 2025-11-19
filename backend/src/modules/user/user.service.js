// backend/src/modules/user/user.service.js
const User = require("./user.model");

// ✅ 1) Get current user profile (without password)
exports.getProfileById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

// ✅ 2) Update current user's profile (safe fields only)
exports.updateProfile = async (userId, payload) => {
  // Whitelist fields: jo update allow hain
  const allowedFields = [
    "name",
    "bio",
    "avatar",
    "skills",
    "social",
    "portfolio",
    "resume",
    "batch",
    "department",
    "headline",
  ];

  const updateData = {};

  for (const key of allowedFields) {
    if (payload[key] !== undefined) {
      updateData[key] = payload[key];
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true }
  ).select("-password");

  return updatedUser;
};

// ✅ 3) Get public profile by ID (for directory/profile view)
exports.getPublicProfile = async (userId) => {
  const user = await User.findById(userId)
    .select("-password -email") // public view me email hide kar sakte ho
    .lean();

  return user;
};
