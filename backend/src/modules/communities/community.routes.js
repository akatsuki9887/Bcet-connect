const router = require("express").Router();
const controller = require("./community.controller");
const auth = require("../../middleware/authMiddleware");

// Create community (any logged in: student/alumni/faculty/admin)
// Future me: sirf alumni/faculty/admin allowed karna ho to roleMiddleware add kar sakte ho
router.post("/", auth, controller.createCommunity);

// Get all communities
router.get("/", auth, controller.getCommunities);

// Get single community (details + members + posts)
router.get("/:id", auth, controller.getCommunityDetails);

// Join community
router.post("/:id/join", auth, controller.joinCommunity);

// Post inside community
router.post("/:id/post", auth, controller.postInCommunity);

module.exports = router;
