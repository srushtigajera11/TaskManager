const router = require("express").Router();
const { authenticate } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { createCommentSchema, updateCommentSchema } = require("../validations/comment.validation");

router.post("/", authenticate, validate(createCommentSchema), commentService.createComment);
router.get("/task/:taskId", authenticate, commentService.getComments);
router.delete("/:id", authenticate, commentService.deleteComment);
router.patch("/:id", authenticate, validate(updateCommentSchema), commentService.updateComment);

module.exports = router;