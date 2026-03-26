const commentService = require("../services/comment.service");
exports.createComment = async (req, res, next) => {
    try{
        const comment = await commentaService.createComment(req.body, req.user);
        res.status(201).json({ success: true, data: comment });
    }catch(error){
        next(error);
    }
};

exports.getComments = async (req,res,next)=>{
    try{
        const taskId = req.params.taskId;
        const comments = await commentService.getComments(taskId,req.user);
        res.status(200).json({ success: true, data: comments });
    }catch(error){
        next(error);
    }
}

exports.deleteComment = async(req,res,next)=>{
    try{
        const commentId = req.params.id;
        await commentService.deleteComment(commentId,req.user);
        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    }catch(error){
        next(error);
    }
}

exports.updateComment = async(req,res,next)=>{
    try{
        const commentId = req.params.id;
        const comment = await commentService.updateComment(commentId,req.body,req.user);
        res.status(200).json({ success: true, data: comment });
    }catch(error){
        next(error);
    }
}
