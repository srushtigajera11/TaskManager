const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhook.controller");

// express.raw() is applied in app.js for this route
router.post("/razorpay", webhookController.razorpayWebhook);

module.exports = router;