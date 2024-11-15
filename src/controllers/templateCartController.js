const { addUserCartModel, getAllCartByUserIdModel, deleteCartByKeyIdModel, updateCartModel } = require('../models/templateCartModel');

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
    updateCartController
}