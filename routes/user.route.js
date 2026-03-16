const express = require("express");
const userController = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validations/user.validation");
const router = express.Router();

// SUPER_ADMIN & ADMIN can manage users

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(createUserSchema),
  userController.createUser
);

router.put(
  "/:id",
  authenticate,
  authorize("super_admin", "admin"),
  validate(updateUserSchema),
  userController.updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorize("super_admin", "admin"),
  userController.deleteUser
);

router.get(
  "/",
  authenticate,
  authorize("super_admin", "admin"),
  userController.getUsers
);

module.exports = router;