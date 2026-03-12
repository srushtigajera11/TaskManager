const Joi = require("joi");

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.registerSchema = Joi.object({
  company : Joi.object({
    name:Joi.string().trim().min(2).max(100).required(),
    phone:Joi.string().trim().min(7).max(15).required(),
    address:Joi.string().trim().max(255).optional().allow(""),
    email: Joi.string().email().trim().required(),
  }).required(),

  name:Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must have uppercase, lowercase, number and special character",
    }),
  plan_id: Joi.string().hex().length(24).required().messages({
    "string.length": "Invalid plan_id",
    "string.hex": "Invalid plan_id",
  }),
})