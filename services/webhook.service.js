const crypto = require("crypto");
const Company = require("../models/company.model");
const User = require("../models/user.model");
const Plan = require("../models/plan.model");
const AppError = require("../utils/AppError");

const verifySignature = (rawBody, signature) => {
  if (process.env.NODE_ENV === "development") return; 

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

  const companyUpdate = await Company.findByIdAndUpdate(company_id, {
    status: "active",
    plan: plan_id,
    expiryDate,
  }, { new: true });


  const userUpdate = await User.findOneAndUpdate(
    { company: company_id, role: "admin" },
    { status: "active" },
    { new: true }
  );
  
};
const handlePaymentFailure = async (notes) => {
  const { company_id } = notes;

  await Company.findByIdAndUpdate(company_id, {
    status: "payment_failed",
  });
};

exports.handleRazorpayWebhook = async (rawBody, signature) => {
  verifySignature(rawBody, signature);

  const event = JSON.parse(rawBody);

  let notes;

  switch (event.event) {
    case "payment_link.paid":
      notes = event?.payload?.payment_link?.entity?.notes; // ← fixed path
      await handlePaymentSuccess(notes);
      break;

    case "payment_link.cancelled":
    case "payment.failed":
      notes = event?.payload?.payment_link?.entity?.notes;
      await handlePaymentFailure(notes);
      break;

    default:
      break;
  }
};