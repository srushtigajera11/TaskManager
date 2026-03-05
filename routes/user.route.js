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
  authorize("SUPER_ADMIN", "ADMIN"),
  validate(createUserSchema),
  userController.createUser
);

router.put(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN", "ADMIN"),
  validate(updateUserSchema),
  userController.updateUser
);

router.delete(
  "/:id",
  authenticate,
  authorize("SUPER_ADMIN", "ADMIN"),
  userController.deleteUser
);

router.get(
  "/",
  authenticate,
  authorize("SUPER_ADMIN", "ADMIN"),
  userController.getUsers
);

module.exports = router;