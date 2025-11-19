const router = require("express").Router();
const controller = require("./user.controller");
const auth = require("../../middleware/authMiddleware");

// CURRENT USER ROUTES
router.get("/me", auth, controller.getMyProfile);
router.put("/me", auth, controller.updateMyProfile);

// PUBLIC PROFILE
router.get("/:id", controller.getPublicProfile);

module.exports = router;
