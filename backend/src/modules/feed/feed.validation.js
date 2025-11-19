// backend/src/modules/feed/feed.validation.js
const Joi = require("joi");

const mediaSchema = Joi.object({
  type: Joi.string().valid("image", "video").required(),
  url: Joi.string().uri().required(),
});

exports.createPostSchema = Joi.object({
  text: Joi.string().allow("", null),
  media: Joi.array().items(mediaSchema).default([]),
  postType: Joi.string()
    .valid("general", "job", "event", "resource")
    .default("general"),
}).custom((value, helpers) => {
  if ((!value.text || value.text.trim() === "") && (!value.media || value.media.length === 0)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "text or media required");
