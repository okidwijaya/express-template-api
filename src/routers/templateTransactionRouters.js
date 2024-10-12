const express = require("express");

const templateTransactionRouter = express.Router();

const useController = require("../controllers/templateTransactionController");

templateTransactionRouter.post('/', useController.addTransactionController);

// templateCartRouter.get('/:id', useController.getCartProductController);

module.exports = templateTransactionRouter;