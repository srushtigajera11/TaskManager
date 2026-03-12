const express = require("express");
const router = express.Router();
const planController = require("../controllers/plan.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { createPlanSchema, updatePlanSchema } = require("../validations/plan.validation");

// All plan routes are Super Admin only
router.use(authenticate, authorize("super_admin"));

router.post("/", validate(createPlanSchema), planController.createPlan);
router.get("/", planController.getAllPlans);
router.get("/:id", planController.getPlanById);
router.patch("/:id", validate(updatePlanSchema), planController.updatePlan);
router.delete("/:id", planController.deletePlan);

module.exports = router;