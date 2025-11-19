const { MentorshipRequest, Message } = require("./mentorship.model");
const User = require("../user/user.model");

// 🔍 1) Mentor List (Alumni + Faculty)
exports.getMentorList = async () => {
  // NOTE: tumhara user.model me company nahi hai,
  // isliye sirf safe fields select kiye hai
  return await User.find({ role: { $in: ["alumni", "faculty"] } }).select(
    "name avatar role skills bio"
  );
};

// 🔍 2) Single Mentor Detail
exports.getMentorDetail = async (id) => {
  return await User.findById(id).select("-password");
};

// 📩 3) Send Mentorship Request
exports.sendMentorshipRequest = async (senderId, receiverId, message) => {
  // Optional: same receiver ko duplicate pending request avoid karna ho to yaha check kar sakte ho

  return await MentorshipRequest.create({
    sender: senderId,
    receiver: receiverId,
    message,
  });
};

// 💬 4) Get Chat Messages Between Two Users
exports.getMessages = async (user1, user2) => {
  return await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 },
    ],
  })
    .sort({ createdAt: 1 })
    .populate("sender", "name avatar role")
    .populate("receiver", "name avatar role");
};

// 💬 5) Send New Message
exports.sendMessage = async (senderId, receiverId, text) => {
  const msg = await Message.create({
    sender: senderId,
    receiver: receiverId,
    text,
  });

  // populate so frontend ko sender info mil jaye
  return await msg.populate("sender", "name avatar role");
};
