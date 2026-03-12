const Company = require("../models/company.model");
const AppError = require('../utils/AppError')

exports.createCompany = async (data)=>{
    const existingCompany = await Company.findOne({email:data.email});
    if(existingCompany){
        throw new AppError("Company email already exists",400);
    }
    const company = await Company.create(data);
    return company;
}

exports.updateCompany = async (companyId , data)=>{
    const company = await Company.findById(companyId);
    if(!company){
        throw new AppError('Company not found',404);
    }

    Object.assign(company,data);
    await company.save();
    return company;
}

exports.deleteCompany = async (companyId) => {
  const company = await Company.findById(companyId);
  if (!company) {
    throw new AppError("Company not found", 404);
  }

  await company.deleteOne();
  return true;
};

exports.getCompanies = async ({ page = 1, limit = 10, search = "", sort = "createdAt", order = "desc" }) => {
  const skip = (page - 1) * limit;

  const filter = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  const sortOrder = order === "asc" ? 1 : -1;

  const [companies, total] = await Promise.all([
    Company.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ [sort]: sortOrder })
      .populate("plan", "name maxUsers maxProjects price"),
    Company.countDocuments(filter),
  ]);

  return { total, page, limit, totalPages: Math.ceil(total / limit), companies };
};