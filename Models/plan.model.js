const mongoose = require("mongoose")
const planSchema = new mongoose.Schema({
     name : {type:String,required:true},
        maxUsers : {type:Number ,default:null, required:true},
        maxProjects : {type:Number,default:null,required : true},
        durationInDays :{type:Number , required:true},
        price : {type:Number , required:true},
        isActive : {type:Boolean , default : true}
},{timestamps : true});

module.exports = mongoose.model('Plan',planSchema);