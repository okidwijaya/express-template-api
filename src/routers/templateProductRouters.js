const express = require("express");

const templateProductRouter = express.Router();

const useController = require('../controllers/templateProductControllers');

templateProductRouter.get('/', useController.getAllProductController);

templateProductRouter.get('/:id', useController.getProductByKeyIdController);

templateProductRouter.post('/', useController.addProductController);

templateProductRouter.delete('/:id', useController.deleteProductByKeyIdController);

templateProductRouter.patch('/:id', useController.updateProductController);

module.exports = templateProductRouter;