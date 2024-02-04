const express = require("express");

const { AuthRequestValidator } = require("../../middlewares/index");
const UserController = require("../../controllers/user-controller");

const router = express.Router();

router.post(
  "/signup",
  AuthRequestValidator.validUserAuth,
  UserController.create
);
router.post(
  "/signin",
  AuthRequestValidator.validUserAuth,
  UserController.signIn
);

module.exports = router;
