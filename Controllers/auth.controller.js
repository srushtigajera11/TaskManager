const authService = require("../services/auth.service");
const sendResponse = require("../utils/response");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } =
      await authService.login(email, password);

    sendResponse(res, 200, "Login successful", {
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const result = await authService.refreshAccessToken(refreshToken);

    sendResponse(res, 200, "Token refreshed", result);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id);
    sendResponse(res, 200, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};