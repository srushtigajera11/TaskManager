const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name :{type : String , required : true,trim: true},
    shortCode : {type : String , required : true, uppercase: true, trim: true},
    description : {type : String},
    company : {type : mongoose.Schema.Types.ObjectId , ref : "Company", required : true},
    createdBy : {type : mongoose.Schema.Types.ObjectId , ref : "User", required : true},
    assignedUsers : [{type: mongoose.Schema.Types.ObjectId ,ref : "User"}],
    status : {type : String , enum : ["active", "archived"], default : "active"},
},{ timestamps : true});
projectSchema.index({ shortCode: 1, company: 1 }, { unique: true });
module.exports = mongoose.model("Project", projectSchema);
