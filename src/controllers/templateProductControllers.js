const { getAllProductModel, getProductByKeyIdModel, addProductModel, deleteProductByKeyIdModel, updateProductModel } = require('../models/templateProductModel');

const getAllProductController = (req, res) => {
    getAllProductModel()
    .then(({ status, result}) => {
        res.status(status).json({
            status: status,
            result: result
        })
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            message: err.message || 'Internal Server Error',
            error: err.err || err
        });
    });
}

const getProductByKeyIdController = (req, res) => {
    const { id } = req.params;

    getProductByKeyIdModel(id)
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
        });
    });
}

const addProductController = (req, res) => {
    const { body } = req;

    addProductModel(body)
    .then(({ status, result}) => {
        res.status(201).json({
            status: status,
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({ 
            error: err, 
            message: 'Internal Server Error' 
        });
    })
}

const deleteProductByKeyIdController = (req, res) => {
    const { id } = req.params;

    deleteProductByKeyIdModel(id)
    .then(({status, result}) => {
        res.status(status).json({
            status: status,
            message: 'Product Delete Success'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err
        });
    });
}

const updateProductController = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    
    updateProductModel(id, body)
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
        });
    });
}

module.exports = {
    getAllProductController,
    getProductByKeyIdController,
    addProductController,
    deleteProductByKeyIdController,
    updateProductController
}