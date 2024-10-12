const { addTransactionModel }= require('../models/templateTransactionModel');

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
    addTransactionController
}