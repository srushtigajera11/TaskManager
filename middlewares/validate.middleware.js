const AppError = require("../utils/AppError");

exports.validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map((err) => err.message).join(", ");
      return next(new AppError(message, 400));
    }

    req[property] = value; // sanitized data
    next();
  };
};