const { string, required } = require('joi');
const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    }, 
    
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      trim: true,
    },

    plan :{
        name : {type:String,required:true},
        maxUsers : {type:Number , required:true},
        maxProjects : {type:Number,required : true},
        durationInDays :{type:Number , required:true},
        price : {type:Number , required:true},
        planExpiryDate : {type:Date, required:true},
        isActive : {type:Boolean , default : true}
    }
},{timestamps:true});

module.exports = mongoose.model('Company',companySchema);