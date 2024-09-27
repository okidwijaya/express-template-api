const express = require("express");

const templateUserRouter = express.Router();

const useController = require("../controllers/templateUserController");

const useMiddleware = require("../middlewares/templateUserMiddleware");

templateUserRouter.post(
  "/register",
  useMiddleware.checkExistingEmail,
  useController.userRegistertrationController
);

templateUserRouter.post("/login", useController.userLoginController);

templateUserRouter.get('/users', useController.usersController)

module.exports = templateUserRouter;
