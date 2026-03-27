const Comment = require("../models/commemt.model");
const Task = require("../models/task.model");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");

exports.createComment = async (data, currentUser) => {

   const { content, task: taskId } = data;

   console.log("taskId from request:", taskId);
   console.log("isValidObjectId:", mongoose.Types.ObjectId.isValid(taskId));

   const task = await Task.findById(taskId);

   console.log("task found:", task);

   if (!task) throw new AppError("Task not found", 404);

   console.log("task.company:", task.company);
   console.log("user.company:", currentUser.company);

   if (task.company.toString() !== currentUser.company.toString()) {
      throw new AppError("Unauthorized access", 403);
   }

   const comment = await Comment.create({
      content,
      task: taskId,
      createdBy: currentUser._id,
      company: currentUser.company
   });

   return comment;
};
exports.getComments = async(taskId,currentUser)=>{
    const task = await Task.findById(taskId);
    if(!task) throw new AppError("Task not found",404);
    // Company isolation
    if(task.company.toString() !== currentUser.company._id.toString()){
        throw new AppError("Unauthorized access",403);
    }
    const comments = await Comment.find({task:taskId}).populate("createdBy","name email").sort({createdAt:-1});
    return comments;
}

exports.deleteComment = async(commentId,currentUser)=>{
    const comment = await Comment.findById(commentId);
    if(!comment) throw new AppError("Comment not found",404)
    // Company isolation
    if(comment.company.toString() !== currentUser.company._id.toString()){
        throw new AppError("Unauthorized access",403);
    }
    if(comment.createdBy.toString() !== currentUser._id.toString()){
        throw new AppError("You can only delete your own comments",403);
    }
    await comment.deleteOne();
    return true;
}
exports.updateComment = async(commentId,data,currentUser)=>{
    const comment = await Comment.findById(commentId);
    if(!comment) throw new AppError("Comment not found",404)
    // Company isolation
    if(comment.company.toString() !== currentUser.company._id.toString()){
        throw new AppError("Unauthorized access",403);
    }   
    if(comment.createdBy.toString() !== currentUser._id.toString()){
        throw new AppError("You can only update your own comments",403);
    }
    comment.content = data.content || comment.content;
    await comment.save();
    return comment;
}