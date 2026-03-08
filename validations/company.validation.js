const Joi = require("joi");

exports.createCompanySchema = Joi.object({
  name: Joi.string().trim().required(),

  email: Joi.string().email().required(),

  phone: Joi.string().required(),

  address: Joi.string().allow("").optional(),

  plan: Joi.object({
    name: Joi.string().required(),
    maxUsers: Joi.number().min(1).required(),
    maxProjects: Joi.number().min(1).required(),
    durationInDays: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
    planExpiryDate: Joi.date().required()
  }).required()
});

exports.updateCompanySchema = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().allow("").optional(),
  plan: Joi.object({
    name: Joi.string().optional(),
    maxUsers: Joi.number().min(1).optional(),
    maxProjects: Joi.number().min(1).optional(),
    durationInDays: Joi.number().min(1).optional(),
    price: Joi.number().min(0).optional(),
  }).optional(),
  planExpiryDate: Joi.date().optional(),
});