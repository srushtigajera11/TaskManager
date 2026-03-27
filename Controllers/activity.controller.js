const activityService = require("../services/activity.service");
const sendResponse = require("../utils/response");

exports.getTaskActivity = async(req,res,next)=>{
    try{
        const taskId = req.params.id;
        const activities = await activityService.getTaskActivity(taskId,req.user);
        sendResponse(res,200,"Task activities fetched successfully",{activities});
    }
    catch(error){
        next(error);
    }
}