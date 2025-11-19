const Community = require("./community.model");

exports.createCommunity = async (data, userId) => {
  // creator = member by default
  const communityData = {
    name: data.name,
    description: data.description || "",
    banner: data.banner || "",
    createdBy: userId,
    members: [userId],
    channels: [
      { name: "general" },
      { name: "jobs" },
      { name: "events" },
      { name: "resources" }
    ]
  };

  const community = await Community.create(communityData);
  return community;
};

exports.getCommunities = async () => {
  const communities = await Community.find()
    .populate("createdBy", "name avatar role")
    .sort({ createdAt: -1 });

  return communities;
};

exports.getCommunityDetails = async (id) => {
  const community = await Community.findById(id)
    .populate("members", "name avatar role")
    .populate("createdBy", "name avatar role")
    .populate("posts.user", "name avatar role");

  return community;
};

exports.joinCommunity = async (communityId, userId) => {
  const updated = await Community.findByIdAndUpdate(
    communityId,
    { $addToSet: { members: userId } }, // same user multiple times nahi
    { new: true }
  )
    .populate("members", "name avatar role")
    .populate("createdBy", "name avatar role");

  return updated;
};

exports.postInCommunity = async (communityId, userId, content) => {
  const newPost = {
    user: userId,
    channel: content.channel || "general",
    text: content.text
  };

  const updated = await Community.findByIdAndUpdate(
    communityId,
    {
      $push: { posts: newPost }
    },
    { new: true }
  ).populate("posts.user", "name avatar role");

  return updated;
};
