const userService = require("../services/user.service");
const sendResponse = require("../utils/response");

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body, req.user);

    sendResponse(res, 201, "User created successfully", user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body,
      req.user
    );

    sendResponse(res, 200, "User updated successfully", user);
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id, req.user);

    sendResponse(res, 200, "User deleted successfully", null);
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await userService.getUsers(
      Number(page),
      Number(limit),
      req.user
    );
    sendResponse(res, 200,  "Users fetched successfully", result);
  } catch (error) {
    next(error);
  }
};