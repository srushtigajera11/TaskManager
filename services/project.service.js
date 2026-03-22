const AppError = require("../utils/AppError");
const Plan = require("../models/plan.model");
const Company = require("../models/company.model")
const Project = require("../models/project.model")
const User = require("../models/user.model")
const mongoose = require("mongoose");

exports.createProject = async (companyId, userId, data) => {
  const { name,shortCode, description, assignedUsers, status } = data;

 
  const company = await Company.findById(companyId).populate("plan");
  if (!company) throw new AppError("Company not found", 404);

  const projectCount = await Project.countDocuments({ company: companyId });
  if (projectCount >= company.plan.maxProjects) {
    throw new AppError(
      `Project limit reached. Your plan allows maximum ${company.plan.maxProjects} projects.`,
      403
    );
  }
  const project = await Project.create({
    name,
    shortCode,
    description,
    company: companyId,
    createdBy: userId,
    assignedUsers: assignedUsers || [],
    status: status || "active",
  });

  return project;
};

exports.assignUsers = async (projectId, userIds,currentUser) => {
  const project = await Project.findById(projectId);
  if (!project) throw new AppError("Project not found", 404);

  if (project.company.toString() !== currentUser.company._id.toString()) {
    throw new AppError("Unauthorized access", 403);
  }

  const users = await User.find({
    _id: { $in: userIds },
    company: currentUser.company._id,
  });

  if (users.length !== userIds.length) {
    throw new AppError("Some users don't belong to your company", 400);
  }

  const uniqueUsers = userIds.filter(
    (id) => !project.assignedUsers.map((u) => u.toString()).includes(id.toString())
  );

  project.assignedUsers.push(...uniqueUsers);
  await project.save();
  return project;
};

exports.getProjects = async(companyId, userId, role, query) => {
     const filter = { company: companyId };  
     const { page = 1, limit = 10, search = "", sort = "createdAt", order = "desc" } = query;
  const skip = (page - 1) * limit;
     if (role === "user") {
    filter.assignedUsers = userId;
  }
   
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  const sortOrder = order === "asc" ? 1 : -1;
  const [projects,total] = await Promise.all([
  Project.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ [sort]: sortOrder })
      .populate("assignedUsers", "name email")
      .populate("createdBy", "name email"),
    Project.countDocuments(filter),
  ]);
return {
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
    projects,
  };
};
