const Joi = require("joi");

exports.createUserSchema = Joi.object({
  name:     Joi.string().trim().required(),
  email:    Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

exports.updateUserSchema = Joi.object({
  name:     Joi.string().trim().optional(),
  email:    Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
});