const planService = require("../services/plan.service");
const sendResponse = require("../utils/response");

exports.createPlan = async (req, res, next) => {
  try {
    const plan = await planService.createPlan(req.body);
    sendResponse(res, 201,"Plan created successfully", { plan });
  } catch (error) {
    next(error);
  }
};

exports.updatePlan = async (req, res, next) => {
  try {
    const plan = await planService.updatePlan(req.params.id, req.body);
    sendResponse(res, 200, "Plan updated successfully", { plan });
  } catch (error) {
    next(error);
  }
};

exports.deletePlan = async (req, res, next) => {
  try {
    await planService.deletePlan(req.params.id);
    sendResponse(res, 200, "Plan deleted successfully");
  } catch (error) {
    next(error);
  }
};

exports.getPlanById = async (req, res, next) => {
  try {
    const plan = await planService.getPlanById(req.params.id);
    sendResponse(res, 200, "Plan fetched successfully", { plan });
  } catch (error) {
    next(error);
  }
};

exports.getAllPlans = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
      isActive,
    } = req.query;

    const result = await planService.getAllPlans({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
      sortBy,
      sortOrder,
      isActive,
    });

    sendResponse(res, 200, "Plans fetched successfully", result);
  } catch (error) {
    next(error);
  }
};