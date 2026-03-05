const Joi = require("joi");

exports.createUserSchema = Joi.object({
  name: Joi.string().trim().required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  role: Joi.string()
    .valid("SUPER_ADMIN", "ADMIN", "USER")
    .required(),

  company_id: Joi.string().optional(),
});

exports.updateUserSchema = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid("SUPER_ADMIN", "ADMIN", "USER").optional(),
  company_id: Joi.string().optional(),
});