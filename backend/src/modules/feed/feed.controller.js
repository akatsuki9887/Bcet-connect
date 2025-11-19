// backend/src/modules/feed/feed.controller.js
const feedService = require("./feed.service");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");

exports.createPost = catchAsync(async (req, res) => {
  const post = await feedService.createPost(req.user.id, req.body);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
});

exports.getFeed = catchAsync(async (req, res) => {
  const { type } = req.query; // ?type=job / event / general / all

  const posts = await feedService.getFeed({
    postType: type || "all",
  });

  res.json({
    success: true,
    data: posts,
  });
});

exports.deletePost = catchAsync(async (req, res) => {
  const isAdmin = req.user.role === "admin";

  const deleted = await feedService.deletePost(
    req.params.id,
    req.user.id,
    isAdmin
  );

  if (!deleted) {
    throw new ApiError(403, "Not allowed to delete this post");
  }

  res.json({
    success: true,
    message: "Post deleted",
  });
});
