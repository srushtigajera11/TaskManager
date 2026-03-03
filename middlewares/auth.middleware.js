const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");

exports.authenticate = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Extract token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("Access denied. No token provided.", 401));
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Fetch user from DB
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("User not found.", 401));
    }

    if (!user.isActive) {
      return next(new AppError("User account is inactive.", 403));
    }

    // 4️⃣ Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token.", 401));
  }
};
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to access this resource.", 403)
      );
    }
    next();
  };
};