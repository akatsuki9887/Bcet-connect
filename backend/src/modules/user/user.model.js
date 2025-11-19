// backend/src/modules/user/user.model.js
const mongoose = require("mongoose");

const portfolioItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },   // Project name
    link: { type: String },                    // GitHub/Live link
    image: { type: String },                   // Thumbnail image URL (Cloudinary)
    description: { type: String },             // Optional: short desc
    techStack: [String],                       // ["React", "Node", ...]
  },
  { _id: false }
);

const socialSchema = new mongoose.Schema(
  {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["student", "alumni", "faculty", "admin"],
      default: "student",
    },

    // Profile info
    bio: { type: String, default: "" },

    avatar: { type: String }, // profile pic URL (Cloudinary)

    skills: {
      type: [String],
      default: [],
    },

    portfolio: {
      type: [portfolioItemSchema],
      default: [],
    },

    social: {
      type: socialSchema,
      default: {},
    },

    resume: { type: String }, // resume file URL (Cloudinary / other)

    // Optional: fields like batch, department for BCET CONNECT
    batch: { type: String },     // e.g. "2025"
    department: { type: String },// e.g. "CSE"
    headline: { type: String },  // e.g. "Full Stack Developer | BCET CSE"
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
