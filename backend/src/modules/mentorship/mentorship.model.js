const mongoose = require("mongoose");

// 📨 Mentorship Request Schema
const mentorshipRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // student mostly
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // mentor = alumni/faculty
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// 💬 Message / Chat Schema
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MentorshipRequest = mongoose.model(
  "MentorshipRequest",
  mentorshipRequestSchema
);
const Message = mongoose.model("Message", messageSchema);

module.exports = {
  MentorshipRequest,
  Message,
};
