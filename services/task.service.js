const Company = require("../models/company.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");
const Task = require("../models/task.model");
const AppError = require("../utils/AppError");

exports.createTask = async (companyId,userId,data)=>{
    const {title,description,project:projectId,reportTo,assignedTo,priority,status,dueDate} = data;
    const company = await Company.findById(companyId);
    if(!company) throw new AppError("Company not found",404);
    const project = await Project.findById(projectId);
    if(!project) throw new AppError("Project not found",404);
    if(project.company.toString() !== companyId.toString()){
        throw new AppError("Project does not belong to your company",403);
    }
    let assignedToUser = null;
    if(assignedTo){
        assignedToUser = await User.findById(assignedTo);
        if(!assignedToUser) throw new AppError("Assigned user not found",404);
    }
   const taskCount = await Task.countDocuments({ project: projectId });
    const taskNumber = String(taskCount + 1).padStart(2, "0");
    const task_id = `${project.shortCode}-${taskNumber}`; 
    const task = await Task.create({
        task_id,
        title,
        description,
        project: projectId,
        company: companyId,
        createdBy: userId,
        reportTo,
        assignedTo: assignedTo || null,
        priority: priority || "medium",
        status: status || "to-do",
        dueDate: dueDate || null
    });
    return task;
}
