    const express = require("express");
    const router = express.Router();
    const projectController = require("../controllers/project.controller");
    const { authenticate , authorize} = require("../middlewares/auth.middleware");
    const { validate } = require("../middlewares/validate.middleware");
    const { createProjectSchema } = require("../validations/project.validation");

    router.post("/",authenticate ,authorize('admin'),validate(createProjectSchema),projectController.createProject);
    router.post("/:id/assign-users",authenticate,authorize('admin'),projectController.assignUsers);
    module.exports = router;