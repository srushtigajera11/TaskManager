const Activity = require("../routes/activity.model");
const Task = require("../models/task.model");
const AppError = require("../utils/AppError");
exports.getTaskActivity = async(taskId,currentUser)=>{

   const task = await Task.findById(taskId);

   if(!task)
      throw new AppError("Task not found",404);

   if(task.company.toString() !== currentUser.company.toString())
      throw new AppError("Unauthorized",403);

   return Activity.find({
      task: taskId,
      company: currentUser.company
   })
   .populate("changedBy","name email")
   .sort({ createdAt:-1 });

}