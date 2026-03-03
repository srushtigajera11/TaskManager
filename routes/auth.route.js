const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Public route
router.post("/login", authController.login);

module.exports = router;