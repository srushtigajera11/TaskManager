const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task_id : {type : String , required : true, unique : true},
    title : {type : String , required : true, trim : true},
    description : {type : String , trim : true},
    project : {type : mongoose.Schema.Types.ObjectId , ref : "Project", required : true},
    company : {type : mongoose.Schema.Types.ObjectId , ref : "Company", required : true},
    reportTo : {type : mongoose.Schema.Types.ObjectId , ref : "User", required : true},
    assignedTo : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
    priority : {type : String , enum : ["low", "medium", "high"], default : "medium"},
    status : {type : String , enum : ["to-do", "in-progress", "done","testing","qa-verified","re-open","deployment"], default : "to-do"},
    dueDate : Date
},{ timestamps : true});

module.exports = mongoose.model("Task",taskSchema);