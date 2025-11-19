const Joi = require("joi");

exports.createJobSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  company: Joi.string().min(2).max(100).required(),
  location: Joi.string().min(2).max(100).required(),

  employmentType: Joi.string()
    .valid("Full-Time", "Internship", "Part-Time", "Remote")
    .default("Full-Time"),

  mode: Joi.string().valid("Onsite", "Remote", "Hybrid").default("Onsite"),

  description: Joi.string().min(10).required(),

  skills: Joi.array().items(Joi.string()).default([]),

  salaryRange: Joi.object({
    min: Joi.number().min(0),
    max: Joi.number().min(0),
    currency: Joi.string().default("INR"),
  }).optional(),

  deadline: Joi.date().optional(),
});

exports.applyJobSchema = Joi.object({
  resume: Joi.string().uri().optional(), // file URL (later Cloudinary)
});
