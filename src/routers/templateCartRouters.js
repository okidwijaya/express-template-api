const express = require("express");

const templateCartRouter = express.Router();

const useController = require("../controllers/templateCartController");

templateCartRouter.post('/', useController.addProductToCartController);

templateCartRouter.get('/:id', useController.getCartProductController);

templateCartRouter.delete('/:id', useController.deleteCartByKeyIdController);

templateCartRouter.delete('/remove/items', useController.deleteCartItemsController);

templateCartRouter.delete('/products/delete', useController.removeitemscontroller);

templateCartRouter.patch('/:id', useController.updateCartController);

module.exports = templateCartRouter;