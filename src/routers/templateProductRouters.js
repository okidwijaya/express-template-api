const express = require("express");

const templateProductRouter = express.Router();

const useController = require('../controllers/templateProductControllers');

const useMiddleware = require('../middlewares/uploadImages');

templateProductRouter.get('/', useController.getAllProductController);

templateProductRouter.get('/find', useController.getProductController);

templateProductRouter.get('/:id', useController.getProductByKeyIdController);

templateProductRouter.post('/', useMiddleware.uploadMultiPart, useController.addProductController);

templateProductRouter.delete('/:id', useController.deleteProductByKeyIdController);

templateProductRouter.patch('/:id', useController.updateProductController);

module.exports = templateProductRouter;