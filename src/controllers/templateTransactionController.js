const { addTransactionModel, getAllTransactionModel }= require('../models/storeTransactionModel');

const getAllTransactionController = (req, res) => {
    getAllTransactionModel()
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

const addTransactionController = (req, res) => {
    const { body } = req;

    addTransactionModel(body)
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
    addTransactionController,
    getAllTransactionController
}