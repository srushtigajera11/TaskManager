const User = require("../models/user.model");
const Company = require("../models/company.model");
const AppError = require("../utils/AppError");

exports.createUser = async (data, currentUser) => {
  // 1️⃣ Role restriction logic

  if (currentUser.role === "admin") {
    if (data.role !== "USER") {
      throw new AppError(
        "Admin can only create users with role USER",
        403
      );
    }
  }

  if (currentUser.role === "user") {
    throw new AppError("Users are not allowed to create accounts", 403);
  }

  // 2️⃣ Prevent duplicate email
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  // 3️⃣ Company isolation
  if (currentUser.role !== "super_admin") {
    data.company_id = currentUser.company_id;
  }

  const user = await User.create(data);
   const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;
  return userObj;
};

exports.updateUser = async (userId, data, currentUser) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Company isolation
  if (
    currentUser.role !== "super_admin" &&
    user.company_id.toString() !== currentUser.company_id.toString()
  ) {
    throw new AppError("Unauthorized access", 403);
  }

  if (currentUser.role === "admin") {
    if (data.role && data.role !== "USER") {
      throw new AppError(
        "Admin cannot change role to ADMIN or SUPER_ADMIN",
        403
      );
    }
  }

  if (currentUser.role === "user") {
    throw new AppError("Users cannot update accounts", 403);
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
    currentUser.role !== "super_admin" &&
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
    currentUser.role === "super_admin"
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