const { 
    getAllProductModel, 
    getProductByKeyIdModel, 
    addProductModel, 
    deleteProductByKeyIdModel, 
    updateProductModel, 
    getProductModel 
} = require('../models/templateProductModel');

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
    const { body, files } = req;

    addProductModel(body, files)
    .then(({ status, result}) => {
        res.status(201).json({
            status: status,
            result: result,
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

const getProductController = (req, res) => {
    const { search, price, color, collections, tags, page = 1, limit = 10  } = req.query;
    
    const filters = {
        search: search || '',
        price: price || '',
        color: color || '',
        collections: collections || '',
        tags: tags || '',
    }

    getProductModel(filters, parseInt(page), parseInt(limit))
    .then(({ status, result }) => {
        if (status === 200) {
            res.status(status).json({
                status: status,
                result: result,
                message: 'Products fetched successfully'
            });
        } else {
            res.status(status).json({
                status: status,
                result: result,
                message: 'Products fetched with issues'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching products',
            error: err
        });
    });
}

module.exports = {
    getAllProductController,
    getProductByKeyIdController,
    addProductController,
    deleteProductByKeyIdController,
    updateProductController,
    getProductController
}