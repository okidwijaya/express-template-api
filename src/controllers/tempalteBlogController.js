const { getAllArticlesModel, getArticleDetailByIdModel, updateArticleDetailIdModel, deleteArticleDetailIdModel } = require('../models/templateBlogModel');

const getAllArticlesController = (req, res) => {
    getAllArticlesModel()
    .then(({status, result}) => {
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
    .then(({status, result}) => {
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
    .then(({status, result}) => {
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
    .then(({status, result}) => {
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

module.exports = {
    getAllArticlesController,
    getArticleDetailController,
    deleteArticleDetailController,
    updateArticleByIdController
}