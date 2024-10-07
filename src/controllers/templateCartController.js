const { addUserCartModel, getAllCartByUserIdModel } = require('../models/templateCartModel');

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

module.exports = {
    addProductToCartController,
    getCartProductController
}