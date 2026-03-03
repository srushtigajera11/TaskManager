const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true,
    trim : true
   },
   email:{
      type:String,
    required:true,
    trim : true
   },
   password:{
      type: String,
      required: true,
      minlength: 6,
      select: false, // never return password by default
   },
     role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "USER"],
      required: true,
    },

    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: function () {
        return this.role !== "SUPER_ADMIN";
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
},{timestamps : true});
userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
module.exports = mongoose.model('User',userSchema);