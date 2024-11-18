const express = require("express");

const templateCartRouter = express.Router();

const useController = require("../controllers/templateCartController");

templateCartRouter.post('/', useController.addProductToCartController);

templateCartRouter.get('/:id', useController.getCartProductController);

templateCartRouter.delete('/:id', useController.deleteCartByKeyIdController);

templateCartRouter.delete('/items', useController.deleteCartItemsController);

templateCartRouter.patch('/:id', useController.updateCartController);

module.exports = templateCartRouter;