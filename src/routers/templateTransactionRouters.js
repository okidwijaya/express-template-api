const express = require("express");

const storeTransactionRouter = express.Router();

const useController = require("../controllers/templateTransactionController");

storeTransactionRouter.post('/', useController.addTransactionController);

storeTransactionRouter.get('/', useController.getAllTransactionController);

storeTransactionRouter.get('/:id', useController.getTransactionByIdController);

module.exports = storeTransactionRouter;