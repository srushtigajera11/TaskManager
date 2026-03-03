const User = require("../models/user.model");
const Company = require("../models/company.model");
const AppError = require("../utils/AppError");

exports.createUser = async (data, currentUser) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  // Company isolation
  if (currentUser.role !== "SUPER_ADMIN") {
    data.company_id = currentUser.company_id;
  }

  const user = await User.create(data);
  return user;
};

exports.updateUser = async (userId, data, currentUser) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Prevent cross-company update
  if (
    currentUser.role !== "SUPER_ADMIN" &&
    user.company_id.toString() !== currentUser.company_id.toString()
  ) {
    throw new AppError("Unauthorized access", 403);
  }

  Object.assign(user, data);
  await user.save();

  return user;
};

exports.deleteUser = async (userId, currentUser) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (
    currentUser.role !== "SUPER_ADMIN" &&
    user.company_id.toString() !== currentUser.company_id.toString()
  ) {
    throw new AppError("Unauthorized access", 403);
  }

  await user.deleteOne();
  return true;
};

exports.getUsers = async (page = 1, limit = 10, currentUser) => {
  const skip = (page - 1) * limit;

  const filter =
    currentUser.role === "SUPER_ADMIN"
      ? {}
      : { company_id: currentUser.company_id };

  const users = await User.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(filter);

  return {
    total,
    page,
    limit,
    users,
  };
};