const { 
    getAllCollectionModel
} = require('../models/templateCollectionModel');

const getAllCollectionController = (req, res) => {
    getAllCollectionModel()
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

module.exports = {
    getAllCollectionController,
}