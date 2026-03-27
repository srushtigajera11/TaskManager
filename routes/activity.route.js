const activityController = require("../controllers/activity.controller");
const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth.middleware");

router.get("/task/:id", authenticate, activityController.getTaskActivity);

module.exports = router;