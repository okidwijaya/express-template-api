const { addUserCartModel, getAllCartByUserIdModel, deleteCartByKeyIdModel, updateCartModel, deleteCartItemsModel } = require('../models/templateCartModel');

const getCartProductController = (req, res) => {
    const { id } = req.params;
    console.log(id)
    getAllCartByUserIdModel(id)
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

const addProductToCartController = (req, res) => {
    const { body } = req;

    addUserCartModel(body)
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

const deleteCartByKeyIdController = (req, res) => {
    const { id } = req.params;

    deleteCartByKeyIdModel(id)
    .then(({status, result}) => {
        res.status(status).json({
            result: result,
            status: status,
            message: 'Cart Delete Success'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err
        });
    });
}

const deleteCartItemsController = (req, res) => {
    const { items } = req.body;
    console.log('Received items:', items); // Check the received items in the console
    console.log('Request body:', req.body); // Log the full body to ensure it's correct

    // Validate that items is an array and is not empty
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty array of item IDs.' });
    }

    deleteCartItemsModel(items)
        .then(({ status, result }) => {
            res.status(status).json({
                result: result,
                rows: `${result.affectedRows} records deleted successfully.`,
                message: 'Items in Cart Delete Success'
            });
        })
        .catch((err) => {
            console.error('Error deleting cart items:', err); // Log errors for debugging
            res.status(err.status || 500).json({
                message: 'Internal Server Error',
                error: err.err || 'Unexpected error'
            });
        });
}


const updateCartController = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    
    updateCartModel(id, body)
    .then(({status, result}) => {
        res.status(status).json({
            status: status,
            result: result,
            message: 'Update Cart Success'
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
    addProductToCartController,
    getCartProductController,
    deleteCartByKeyIdController,
    deleteCartItemsController,
    updateCartController
}