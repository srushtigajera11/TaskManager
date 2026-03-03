const { required } = require("joi");
const mongoose = require("mongoose");
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

module.exports = mongoose.model('User',userSchema);