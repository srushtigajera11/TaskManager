const Joi = require("joi");

exports.createComment = Joi.object({
  content: Joi.string().trim().required(),
  task: Joi.string().hex().length(24).required(), // MongoDB ObjectId
  createdBy: Joi.string().hex().length(24).required(), // MongoDB ObjectId
  company: Joi.string().hex().length(24).required(), // MongoDB ObjectId
});

exports.updateComment = Joi.object({
  content: Joi.string().trim().optional(),
}); 
  