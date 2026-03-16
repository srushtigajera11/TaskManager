const webhookService = require("../services/webhook.service");
const appError = require("../utils/AppError");
const sendResponse = require("../utils/response");
exports.razorpayWebhook = async (req, res, next) => {
  try {
  

    const rawBody = Buffer.isBuffer(req.body)
      ? req.body
      : Buffer.from(JSON.stringify(req.body)); 

    const signature = req.headers["x-razorpay-signature"];

    await webhookService.handleRazorpayWebhook(rawBody, signature);

    return sendResponse(res, 200, "Webhook processed");
  } catch (error) {
    next(error)
  }
};
