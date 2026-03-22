const Joi = require("joi");

exports.createTaskSchema = Joi.object({
  title:       Joi.string().required(),
  description: Joi.string().optional(),
  project   :   Joi.string().hex().length(24).required(),
  assignedTo:  Joi.string().hex().length(24).optional(),
  reportTo:    Joi.string().hex().length(24).required(),
  priority:    Joi.string().valid("low", "medium", "high").default("medium"),
  status:      Joi.string().valid("to-do", "in-progress", "done", "testing", "qa-verified", "re-open", "deployment").default("to-do"),
  dueDate:     Joi.date().optional(),
});

exports.updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("to-do", "in-progress", "done", "testing", "qa-verified", "re-open", "deployment")
    .required(),
});