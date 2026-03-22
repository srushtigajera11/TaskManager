const taskService = require("../services/task.service");
const sendResponse = require("../utils/response");
exports.createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask( req.user.company._id, req.user._id,req.body);
    sendResponse(res, 201, "Task created successfully", { task }); 
    } catch (error) {
        next(error);
    }   
};

exports.getTasks = async (req, res, next) => {
  try {
    const companyId = req.user.company._id;
    const userId = req.user._id;
    const role = req.user.role;
    const result = await taskService.getTasks(companyId, userId, role, req.query);
    sendResponse(res, 200, "Tasks fetched successfully", result);
    } catch (error) {
        next(error);
    }   
}

exports.updateTask = async(req,res,next)=>{
    try{
        const taskId = req.params.id;
        const task = await taskService.updateTask(taskId,req.body,req.user);
        sendResponse(res,200,"Task updated successfully",{task});
    }catch(error){
        next(error);
    }
}

exports.deleteTask = async(req,res,next)=>{
    try{
        const taskId = req.params.id;
        const task = await taskService.deleteTask(taskId,req.user);
        sendResponse(res,200,"Task deleted successfully",{task});
    }catch(error){
        next(error);
    }
}

exports.updateStatus = async(req,res,next)=>{
    try{
        const taskId = req.params.id;
        const task = await taskService.updateStatus(taskId,req.body,req.user);
        sendResponse(res,200,"Task status updated successfully",{task});
    }catch(error){
        next(error);
    }
}