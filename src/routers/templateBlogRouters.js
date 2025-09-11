const express = require("express")

const templateBlogRouter = express.Router();

const useController = require('../controllers/tempalteBlogController');

templateBlogRouter.get('/articles/all', useController.getAllArticlesController);
templateBlogRouter.get('/articles/:id', useController.getArticleDetailController);
templateBlogRouter.delete('/articles/:id', useController.deleteArticleDetailController);
templateBlogRouter.patch('/articles/:id', useController.updateArticleByIdController);

module.exports = templateBlogRouter;
