const projectService = require('../services/project.service');
const sendResponse = require('../utils/response');
const AppError = require('../utils/AppError');

exports.createProject = async(req,res,next)=>{
    try{
       const comanyId = req.user.company._id;
       const userId = req.user.id;
       const data = req.body;
       const project = await projectService.createProject(comanyId,userId,data)
        sendResponse(res,201,"Project created successfully",project);
    }catch(err){
        next(err);
    }
}

exports.assignUsers = async(req,res,next)=>{
    try{
        const projectId = req.params.id;
        const {userIds} = req.body;
        if(!userIds || !Array.isArray(userIds) || userIds.length === 0){
            throw new AppError("userIds must be a non-empty array",400);
        }
        const project = await projectService.assignUsers(projectId,userIds);
        sendResponse(res,200,"Users assigned successfully",project);
    }
    catch(err){
        next(err);
    }   
}

exports.getProjects = async (req, res, next) => {
  try {
    const companyId = req.user.company._id;
    const userId = req.user._id;
    const role = req.user.role;

    const result = await projectService.getProjects(companyId, userId, role, req.query);
    sendResponse(res, 200, "Projects fetched successfully", result);
  } catch (err) {
    next(err);
  }
};