// models/company.model.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },
  phone:{
    type:String,
    required:true,
    trim : true
  },
  address: {
    type: String,
    trim: true  
  },
  email: {  
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  
  status: {
    type: String,
    enum: ["pending", "active", "payment_failed"],
    default: "pending"
  },

  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan"
  },

  expiryDate: Date,

  payment_link_id: String
},
{ timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);