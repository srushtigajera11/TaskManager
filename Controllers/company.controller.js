const companyService = require("../services/company.service");
const sendResponse = require("../utils/response");

exports.createCompany = async(req,res,next)=>{
    try{
        const company = await companyService.createCompany(req.body);
        sendResponse(res,201,"company created Successfully",company);
    }catch (error) {
    next(error);
  }
}

exports.updateCompany = async (req, res, next) => {
  try {
    const company = await companyService.updateCompany(
      req.params.id,
      req.body
    );

    sendResponse(res, 200,"Company updated successfully", company);
  } catch (error) {
    next(error);
  }
};
exports.deleteCompany = async (req, res, next) => {
  try {
    await companyService.deleteCompany(req.params.id);

    sendResponse(res, 200, "Company deleted successfully", null);
  } catch (error) {
    next(error);
  }
};
exports.getCompanies = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await companyService.getCompanies(
      Number(page),
      Number(limit)
    );

    sendResponse(res, 200,"Companies fetched successfully", result);
  } catch (error) {
    next(error);
  }
};