const express = require("express");
const companyController = require("../controllers/company.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const {
  createCompanySchema,
  updateCompanySchema,
} = require("../validations/company.validation");
const router = express.Router();

// Only SUPER_ADMIN can manage companies

router.post(
  "/",
  authenticate,
  authorize("SUPER_ADMIN"),
  validate(createCompanySchema),
  companyController.createCompany
);

router.put(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  validate(updateCompanySchema),
  companyController.updateCompany
);

router.delete(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN"),
  companyController.deleteCompany
);

router.get(
  "/",
  authenticate,
  authorize("SUPER_ADMIN"),
  companyController.getCompanies
);

module.exports = router;