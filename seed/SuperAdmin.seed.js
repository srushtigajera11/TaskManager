const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const seedSuperAdmin = async()=>{
  const exists = await User.findOne({role:"SUPER_ADMIN"});
  if(exists){
    console.log("super admin already exist");
    return;
  }

  await User.create({
  name: "Super Admin",
  email: "superadmin@test.com",
  password: "123456",
  role: "SUPER_ADMIN",
  company_id: null
});
  console.log("super Admin created");
};

module.exports = seedSuperAdmin;