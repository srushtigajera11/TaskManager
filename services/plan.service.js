const Plan = require("../models/plan.model")
const AppError = require("../utils/AppError");

exports.createPlan = async(data)=>{
    const existing = await Plan.findOne({name : data.name});
    if(existing) throw new AppError("Plan with this name already exists",409);
    const plan = await Plan.create(data);
    return plan;
}

exports.updatePlan = async (planId, data) => {
  const plan = await Plan.findByIdAndUpdate(planId, data, {
    new: true,
    runValidators: true,
  });
  if (!plan) throw new AppError("Plan not found", 404);
  return plan;
};

exports.deletePlan = async (planId) => {
  const plan = await Plan.findByIdAndDelete(planId);
  if (!plan) throw new AppError("Plan not found", 404);
  return plan;
};

exports.getPlanById = async (planId) => {
  const plan = await Plan.findById(planId);
  if (!plan) throw new AppError("Plan not found", 404);
  return plan;
};

exports.getAllPlans = async ({ page, limit, search, sortBy, sortOrder, isActive }) => {
  const query = {};

  if (isActive !== undefined) {
    query.isActive = isActive === "true";
  }

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  // ✅ Define these BEFORE using them
  const allowedSortFields = ["name", "price", "durationInDays", "createdAt"];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
  const sortDirection = sortOrder === "desc" ? -1 : 1;

  const [plans, total] = await Promise.all([
    Plan.find(query)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(limit),
    Plan.countDocuments(query),
  ]);

  return {
    plans,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};