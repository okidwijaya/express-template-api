const express = require("express");

const storeTransactionRouter = express.Router();

const useController = require("../controllers/storeTransactionController");

storeTransactionRouter.post('/', useController.addTransactionController);

storeTransactionRouter.get('/', useController.getAllTransactionController);

// storeCartRouter.get('/:id', useController.getCartProductController);

module.exports = storeTransactionRouter;