const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { createTaskSchema } = require("../validations/task.validation");

router.post("/", authenticate, authorize("admin",),validate(createTaskSchema), taskController.createTask);

module.exports = router;