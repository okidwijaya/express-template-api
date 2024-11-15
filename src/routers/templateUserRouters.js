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

templateUserRouter.get('/:id', useController.getUserByIdController)

templateUserRouter.patch('/:id', useController.updateUserController)

module.exports = templateUserRouter;
