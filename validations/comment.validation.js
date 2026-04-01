const Joi = require("joi");

exports.createCommentSchema = Joi.object({
  content: Joi.string().trim().required(),
  task: Joi.string().hex().length(24).required(), 
  
});

exports.updateCommentSchema = Joi.object({
  content: Joi.string().trim().optional(),
}); 
  