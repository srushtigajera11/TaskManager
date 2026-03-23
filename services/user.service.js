const User = require("../models/user.model");
const Company = require("../models/company.model");
const AppError = require("../utils/AppError");
const { sendWelcomeEmail } = require("./email.service");

exports.createUser = async (data, currentUser) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new AppError("Email already exists", 400);

  const company = await Company.findById(currentUser.company._id).populate("plan");
  if (!company) throw new AppError("Company not found", 404);

  const userCount = await User.countDocuments({
    company: currentUser.company._id,
    role: "user", 
  });

  if (userCount >= company.plan.maxUsers) {
    throw new AppError(
      `User limit reached. Your plan allows maximum ${company.plan.maxUsers} users.`,
      403
    );
  }
 const plainPassword = data.password;
  const user = await User.create({
    ...data,
    role: "user",                        
    status: "active",                   
    company: currentUser.company._id,   
  });
  await sendWelcomeEmail(data.email, plainPassword, company.name);
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
  
  Object.assign(user, data);
  await user.save();
  return user;
};
exports.deleteUser = async (userId, currentUser) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
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