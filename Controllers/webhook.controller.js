const webhookService = require("../services/webhook.service");

exports.razorpayWebhook = async (req, res) => {
  try {
    const rawBody = req.body; // raw buffer — works because of express.raw()
    const signature = req.headers["x-razorpay-signature"];

    if (!signature) {
      return res.status(400).json({ success: false, message: "Signature missing" });
    }

    await webhookService.handleRazorpayWebhook(rawBody, signature);

    return res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Webhook processing failed",
    });
  }
};