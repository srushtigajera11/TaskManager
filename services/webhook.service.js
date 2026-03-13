const crypto = require("crypto");
const Company = require("../models/company.model");
const User = require("../models/user.model");
const Plan = require("../models/plan.model");
const AppError = require("../utils/AppError");

const verifySignature = (rawBody, signature) => {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== signature) {
    throw new AppError("Invalid webhook signature", 400);
  }
};

const handlePaymentSuccess = async (notes) => {
  const { company_id, plan_id } = notes;

  const plan = await Plan.findById(plan_id);
  if (!plan) throw new AppError("Plan not found", 404);

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + plan.durationInDays);

  await Company.findByIdAndUpdate(company_id, {
    status: "active",
    plan: plan_id,
    expiryDate,
  });

  await User.findOneAndUpdate(
    { company: company_id, role: "admin" },
    { status: "active" }
  );
};

const handlePaymentFailure = async (notes) => {
  const { company_id } = notes;

  await Company.findByIdAndUpdate(company_id, {
    status: "payment_failed",
  });
};

exports.handleRazorpayWebhook = async (rawBody, signature) => {
  // Step 1: Verify signature
  verifySignature(rawBody, signature);

  // Step 2: Parse body
  const event = JSON.parse(rawBody);

  // Step 3: Extract notes
  const notes = event?.payload?.payment?.entity?.notes;

  // Step 4: Handle events
  switch (event.event) {
    case "payment_link.paid":
      await handlePaymentSuccess(notes);
      break;

    case "payment_link.cancelled":
    case "payment.failed":
      await handlePaymentFailure(notes);
      break;

    default:
      // Unhandled event — ignore silently
      break;
  }
};