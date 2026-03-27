const router = require("express").Router();
const { authenticate } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { createCommentSchema, updateCommentSchema } = require("../validations/comment.validation");
const commentController = require("../controllers/comment.controller");

router.post("/", authenticate, validate(createCommentSchema), commentController.createComment);
router.get("/task/:taskId", authenticate, commentController.getComments);
router.delete("/:id", authenticate, commentController.deleteComment);
router.patch("/:id", authenticate, validate(updateCommentSchema), commentController.updateComment);

module.exports = router;