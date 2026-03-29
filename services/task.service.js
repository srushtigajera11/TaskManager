const Company = require("../models/company.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");
const Task = require("../models/task.model");
const AppError = require("../utils/AppError");
const Activity = require("../routes/activity.model");

exports.updateTask = async (taskId, data, currentUser) => {

   const task = await Task.findById(taskId);

   if(!task)
      throw new AppError("Task not found",404);

   if(task.company.toString() !== currentUser.company.toString())
      throw new AppError("Unauthorized",403);

   const oldStatus = task.status;

   // user restriction
   if(currentUser.role === "user"){

      // user can only update status
      if(!data.status)
         throw new AppError("User can only update task status",403);

      task.status = data.status;

   }else{

      // admin can update everything
      Object.assign(task,data);

   }

   await task.save();

   // create activity only if status changed
   if(data.status && oldStatus !== data.status){

      await Activity.create({

         task: task._id,

         changedBy: currentUser._id,

         oldStatus,

         newStatus: data.status,

         company: currentUser.company

      });

   }

   return task;
};
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
        assignedTo: assignedTo,
        priority: priority || "medium",
        status: status || "to-do",
        dueDate: dueDate || null
    });
    return task;
}

exports.getTasks = async (companyId, userId, role, query) => {
    const filter = { company: companyId };
    if (role === "user") {
        filter.$or = [
            { assignedTo: userId },
            { reportTo: userId },
            { createdBy: userId }
        ];
    }
    if (query.status) {
        filter.status = query.status;
    }
    if (query.priority) {
        filter.priority = query.priority;
    }
    if (query.dueDate) {
        filter.dueDate = { $lte: new Date(query.dueDate) };
    }
    const tasks =
        await Task.find(filter)
            .populate("project", "name shortCode")
            .populate("assignedTo", "name email")
            .populate("reportTo", "name email")
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });
    return tasks;
};

exports.deleteTask = async (taskId, currentUser) => {
    const task = await Task.findById(taskId);
    if(!task) throw new AppError("Task not found",404);
    if (task.company.toString() !== currentUser.company._id.toString()) {
        throw new AppError("Unauthorized access", 403);
    } 
    await task.deleteOne();
    return true;
}

exports.updateStatus = async (taskId, data, currentUser) => {

   const task = await Task.findById(taskId);

   if (!task)
      throw new AppError("Task not found", 404);


   if (task.company.toString() !== currentUser.company.toString())
      throw new AppError("Unauthorized access", 403);


   if (currentUser.role === "user") {

      if (!task.assignedTo ||
          task.assignedTo.toString() !== currentUser._id.toString()) {

         throw new AppError(
            "You can only update status of assigned tasks",
            403
         );
      }
   }


   const oldStatus = task.status;

   task.status = data.status;

   await task.save();


   // create activity
   if (oldStatus !== data.status) {

      await Activity.create({

         task: task._id,

         changedBy: currentUser._id,

         oldStatus,

         newStatus: data.status,

         company: currentUser.company

      });
   }


   return task;
};
