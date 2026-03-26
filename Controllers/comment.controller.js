const commentService = require("../services/comment.service");
exports.createComment = async (req, res, next) => {
    try{
        const comment = await commentaService.createComment(req.body, req.user);
        res.status(201).json({ success: true, data: comment });
    }catch(error){
        next(error);
    }
};