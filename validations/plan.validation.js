const Joi = require('joi');
exports.createPlanSchema = Joi.object({
    name:Joi.string().trim().min(2).max(50).required(),
    maxUsers : Joi.number().integer().min(1).required(),
    maxProjects : Joi.number().integer().min(1).required(),
    durationInDays: Joi.number().integer().min(1).required(),
    price: Joi.number().min(0).required(),
    isActive: Joi.boolean().default(true),
})

exports.updatePlanSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),
  maxUsers: Joi.number().integer().min(1),
  maxProjects: Joi.number().integer().min(1),
  durationInDays: Joi.number().integer().min(1),
  price: Joi.number().min(0),
  isActive: Joi.boolean(),
}).min(1).messages({
  "object.min": "At least one field is required to update",
});