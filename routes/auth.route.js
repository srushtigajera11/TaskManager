const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const {authenticate} = require("../middlewares/auth.middleware")
const { validate } = require("../middlewares/validate.middleware");
const { loginSchema } = require("../validations/auth.validation");

router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", authController.refreshToken);
router.post("/logout", authenticate, authController.logout);
module.exports = router;