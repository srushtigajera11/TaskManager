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
