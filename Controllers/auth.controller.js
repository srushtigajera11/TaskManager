const authService = require("../services/auth.service");
const sendResponse = require("../utils/response");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.login(email, password);

    sendResponse(res, 200, true, "Login successful", {
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};