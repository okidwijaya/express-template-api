const {
    getAllArticlesModel,
    getArticleDetailByIdModel,
    updateArticleDetailIdModel,
    deleteArticleDetailIdModel,
    addArticleModel,
    addArticleTagModel,
    addBlogAuthorModel,
    addBlogCategoriesModel,
    addBlogTagModel,
    getArticleDetailBySlugModel,
    getBlogCategoriesModel
} = require('../models/templateBlogModel');

const getAllArticlesController = (req, res) => {
    getAllArticlesModel()
        .then(({ status, result }) => {
            res.status(status).json({
                status: status,
                result: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err.message || 'Internal Server Error',
                erro: err.err || err
            })
        })
}

const getArticleDetailController = (req, res) => {
    const { id } = req.params;

    getArticleDetailByIdModel(id)
        .then(({ status, result }) => {
            res.status(200).json({
                status: status,
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            })
        })
}

const getArticleDetailBySlugController = (req, res) => {
    const { slug } = req.params;

    getArticleDetailBySlugModel(slug)
        .then(({ status, result }) => {
            res.status(200).json({
                status: status,
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            })
        })
}

const updateArticleByIdController = (req, res) => {
    const { id } = req.params;
    const { body } = req;

    updateArticleDetailIdModel(id, body)
        .then(({ status, result }) => {
            res.status(status).json({
                status: status,
                result: result,
                message: 'Update Product Success'
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            })
        })
}

const deleteArticleDetailController = (req, res) => {
    const { id } = req.params;

    deleteArticleDetailIdModel(id)
        .then(({ status, result }) => {
            res.status(200).json({
                status: status,
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal Server Error',
                error: err
            })
        })
}

const addArticleController = (req, res) => {
    const { body } = req;

    addArticleModel(body)
    .then(({status, result}) =>{
        res.status(200).json({
            status: status,
            result: result,
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            message: 'Internal Server Error',
        })
    })
}

const addArticleTagController = (req, res) => {
    const { body } = req;

    addArticleTagModel(body)
    .then(({status, result}) =>{
        res.status(200).json({
            status: status,
            result: result,
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            message: 'Internal Server Error',
        })
    })
}

const addBlogAuthorController = (req, res) => {
    const { body } = req;

    addBlogAuthorModel(body)
    .then(({status, result}) =>{
        res.status(200).json({
            status: status,
            result: result,
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            message: 'Internal Server Error',
        })
    })
}

const addBlogCategoriesController = (req, res) => {
    const { body } = req;

    addBlogCategoriesModel(body)
    .then(({status, result}) =>{
        res.status(200).json({
            status: status,
            result: result,
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            message: 'Internal Server Error',
        })
    })
}

const getBlogCategoriesController = (req, res) => {
    
    getBlogCategoriesModel()
    .then(({status, result}) =>{
        res.status(200).json({
            status: status,
            result: result,
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            message: 'Internal Server Error',
        })
    })
}

const addBlogTagController = (req, res) => {
    const { body } = req;

    addBlogTagModel(body)
    .then(({status, result}) =>{
        res.status(200).json({
            status: status,
            result: result,
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err,
            message: 'Internal Server Error',
        })
    })
}

module.exports = {
    getAllArticlesController,
    getArticleDetailController,
    deleteArticleDetailController,
    updateArticleByIdController,
    addArticleController,
    addArticleTagController,
    addBlogAuthorController,
    addBlogCategoriesController,
    addBlogTagController,
    getArticleDetailBySlugController,
    getBlogCategoriesController
}