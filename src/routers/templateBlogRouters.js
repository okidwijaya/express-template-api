const express = require("express")

const templateBlogRouter = express.Router();

const useController = require('../controllers/tempalteBlogController');

templateBlogRouter.get('/articles/all', useController.getAllArticlesController);
templateBlogRouter.get('/articles/:id', useController.getArticleDetailController);
templateBlogRouter.delete('/articles/:id', useController.deleteArticleDetailController);
templateBlogRouter.patch('/articles/:id', useController.updateArticleByIdController);

templateBlogRouter.post('/articles', useController.addArticleController);
templateBlogRouter.post('/articles/tags', useController.addArticleTagController);
templateBlogRouter.post('/articles/tag', useController.addBlogTagController);
templateBlogRouter.post('/author', useController.addBlogAuthorController);
templateBlogRouter.post('/categories', useController.addBlogCategoriesController);
// templateBlogRouter.post('/categories', useController.addBlogTagController);

module.exports = templateBlogRouter;
