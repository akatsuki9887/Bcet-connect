// backend/src/modules/feed/feed.routes.js
const router = require("express").Router();
const controller = require("./feed.controller");
const auth = require("../../middleware/authMiddleware");
const validateRequest = require("../../middleware/validateRequest");
const { createPostSchema } = require("./feed.validation");

// POST /api/feed  → create new post
router.post(
  "/",
  auth,
  validateRequest(createPostSchema),
  controller.createPost
);

// GET /api/feed?type=job
router.get("/", auth, controller.getFeed);

// DELETE /api/feed/:id
router.delete("/:id", auth, controller.deletePost);

module.exports = router;
