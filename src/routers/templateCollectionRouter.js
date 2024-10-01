const express = require("express");

const templateCollectionRouter = express.Router();

const useController = require('../controllers/templateCollectionController');

templateCollectionRouter.get('/', useController.getAllCollectionController);

module.exports = templateCollectionRouter;