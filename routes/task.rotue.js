const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { createTaskSchema,updateStatusSchema } = require("../validations/task.validation");

    router.post("/", authenticate, authorize("admin",),validate(createTaskSchema), taskController.createTask);
    router.get("/", authenticate, taskController.getTasks);
    router.put("/:id", authenticate, authorize("admin"), taskController.updateTask);
    router.delete("/:id", authenticate, authorize("admin"), taskController.deleteTask);
    router.patch("/:id/status", authenticate, validate(updateStatusSchema), taskController.updateStatus);

module.exports = router;