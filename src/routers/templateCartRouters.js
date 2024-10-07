const express = require("express");

const templateCartRouter = express.Router();

const useController = require("../controllers/templateCartController");

templateCartRouter.post('/', useController.addProductToCartController);

templateCartRouter.get('/:id', useController.getCartProductController);

module.exports = templateCartRouter;