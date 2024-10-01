const pool = require('../config/db');

const getAllCollectionModel = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM collections';
        pool.query(query, (err, result) => {
            if(err)return reject({status: 500, err});
            if(result.length == 0) return reject({status: 404, result});
            resolve({ status: 200, result: result.length ? result : [] });
        })
    })
}


module.exports = {
    getAllCollectionModel,
}