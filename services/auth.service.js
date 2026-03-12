const jwt = require("jsonwebtoken");
const User = require("../models/user.model")
const AppError = require("../utils/AppError");
const crypto = require("crypto");
const razorpayService = require("./razorpay.service");
const Company = require("../models/company.model")
const Plan = require("../models/plan.model")
const mongoose = require("mongoose");
exports.login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password +refreshToken").populate("company");

  if (!user) throw new AppError("Invalid credentials", 401);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AppError("Invalid credentials", 401);

  // ✅ Add these checks
  if (user.status === "inactive") throw new AppError("Your account is not activated yet", 403);
  if (user.company && user.company.status !== "active") throw new AppError("Company account is not active", 403);
  
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();

  // Hash refresh token before storing
  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  user.refreshToken = hashedRefreshToken;
  await user.save();
  // 🔐 Remove sensitive fields
  const userObj = user.toObject();
  delete userObj.refreshToken;

  return { user:userObj , accessToken, refreshToken };
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      company_id: user.company,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15h" }
  );
};

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

exports.refreshAccessToken = async (refreshToken) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const user = await User.findOne({ refreshToken: hashedToken });

  if (!user) {
    throw new AppError("Invalid refresh token", 401);
  }

  const newAccessToken = generateAccessToken(user);

  return { accessToken: newAccessToken };
};

exports.logout = async (userId) => {
  const user = await User.findById(userId).select("+refreshToken");
  if (!user) throw new AppError("User not found", 404);

  user.refreshToken = null;
  await user.save();

  return true;
};

exports.register = async ({ company, name, email, password, plan_id }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const plan = await Plan.findOne({ _id: plan_id, isActive: true });
    if (!plan) throw new AppError("Selected plan not found or inactive", 404);

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError("Email already registered", 409);

    const [newCompany] = await Company.create([{
  name:    company.name,
  email:   company.email,    // ✅
  phone:   company.phone,    // ✅
  address: company.address,  // ✅
  status:  "pending",
}], { session });

    const [newUser] = await User.create(
      [{ name, email, password, role: "admin", status: "inactive", company: newCompany._id }],
      { session }
    );

    const { payment_link_id, checkout_url } = await razorpayService.createPaymentLink({
      amount: plan.price,
      companyName: newCompany.name,
      adminEmail: newUser.email,
      companyId: newCompany._id,
      planId: plan._id,
    });

    newCompany.payment_link_id = payment_link_id;
    await newCompany.save({ session });

    await session.commitTransaction();

    return {
      company: { id: newCompany._id, name: newCompany.name, status: newCompany.status },
      admin: { id: newUser._id, name: newUser.name, email: newUser.email, status: newUser.status },
      checkout_url,
    };

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};