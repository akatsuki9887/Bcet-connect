const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    channel: { type: String, default: "general" },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true } // so each post gets its own _id
);

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, default: "text" } // text, jobs, events, resources etc.
  },
  { _id: false }
);

const communitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: { type: String },

    banner: { type: String }, // Cloudinary URL (optional)

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    channels: [channelSchema],

    posts: [postSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Community", communitySchema);
