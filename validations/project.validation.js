const Joi = require("joi");
exports.createProjectSchema = Joi.object({
    name:Joi.string().required(),
    shortCode:  Joi.string().uppercase().min(2).max(6).required(),
    description : Joi.string().optional().max(500),
    assignedUsers : Joi.array().items(Joi.string().hex().length(24)),
    status : Joi.string().valid("active","archived").default("active")
});