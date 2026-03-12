// services/razorpay.service.js
const Razorpay = require("razorpay");
const AppError = require("../utils/AppError");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createPaymentLink = async ({ amount, companyName, adminEmail, companyId, planId }) => {
  try {
     console.log("Razorpay payload:", { amount, companyName, adminEmail, companyId, planId });
    const paymentLink = await razorpay.paymentLink.create({
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      description: `Subscription for ${companyName}`,
      customer: {
        email: adminEmail,
        name: companyName,
      },
      notify: {
        email: true,
      },
      reminder_enable: true,
      notes: {
        company_id: companyId.toString(),
        plan_id: planId.toString(),
      },
      callback_url: `${process.env.FRONTEND_URL}/payment/status`,
      callback_method: "get",
    });
    
    return {
      payment_link_id: paymentLink.id,
      checkout_url: paymentLink.short_url,
    };
  } catch (error) {
    throw new AppError(`Payment link creation failed: ${error.message}`, 502);
  }
};