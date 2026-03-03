const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");

exports.login = async (email,password)=>{
    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw new AppError("Invalid credentials",401);
    }
    const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }
    const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      company_id: user.company_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return { user, token };
};