// backend/src/modules/feed/feed.service.js
const Feed = require("./feed.model");

exports.createPost = async (userId, data) => {
  const payload = {
    postedBy: userId,
    text: data.text,
    media: data.media || [],
    postType: data.postType || "general",
  };

  const post = await Feed.create(payload);

  // Immediately user info populate karke return
  return post.populate("postedBy", "name avatar role");
};

exports.getFeed = async (filters = {}) => {
  const query = {};

  if (filters.postType && filters.postType !== "all") {
    query.postType = filters.postType;
  }

  // Future: filter by following, communities, etc.

  const posts = await Feed.find(query)
    .populate("postedBy", "name avatar role")
    .sort({ createdAt: -1 });

  return posts;
};

exports.deletePost = async (postId, userId, isAdmin = false) => {
  // Admin sabka post delete kar sakta hai
  const condition = isAdmin ? { _id: postId } : { _id: postId, postedBy: userId };

  const post = await Feed.findOne(condition);
  if (!post) return null;

  await Feed.deleteOne({ _id: postId });
  return true;
};
