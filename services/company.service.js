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

exports.getCompanies = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const companies = await Company.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Company.countDocuments();

  return {
    total,
    page,
    limit,
    companies,
  };
};