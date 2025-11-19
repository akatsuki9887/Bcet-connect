const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: String, // resume file URL (Cloudinary / etc.)
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "hired"],
      default: "applied",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },

    employmentType: {
      type: String,
      enum: ["Full-Time", "Internship", "Part-Time", "Remote"],
      default: "Full-Time",
    },

    mode: {
      type: String,
      enum: ["Onsite", "Remote", "Hybrid"],
      default: "Onsite",
    },

    description: { type: String, required: true },

    skills: {
      type: [String],
      default: [],
    },

    salaryRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: "INR" },
    },

    deadline: {
      type: Date,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    applicants: {
      type: [applicantSchema],
      default: [],
    },

    isApproved: {
      type: Boolean,
      default: true, // later admin approval system me false rakh sakte ho
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
