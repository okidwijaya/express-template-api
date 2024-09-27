const express = require("express");

const useController = require("../controllers/unilandController");

const unilandRouter = express.Router();

unilandRouter.get('/', useController.unilandAllDataController);

unilandRouter.post('/add-warranty', useController.unilandCreateRegisterWarranty);

unilandRouter.get('/warranty', useController.unilandGetAllDataWarrantyController);

module.exports = unilandRouter;