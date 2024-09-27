const pool = require('../config/db');
const { deleteProductByKeyIdController } = require('../controllers/templateProductControllers');

const getAllProductModel = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM product_item';
        pool.query(query, (err, result) => {
            if(err)return reject({status: 500, err});
            if(result.length == 0) return reject({status: 404, result});
            resolve({ status: 200, result: result.length ? result : [] });
        })
    })
}

const getProductByKeyIdModel = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM product_item WHERE key_id = '${id}'`;
        pool.query(query, (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: result})
        })
    })
}

const addProductModel = (body) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO product_item SET ?';
        const newBody = {
            ...body,
            key_id: "n82bf02390jwj"
        }
        pool.query(query, [newBody], (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, 
                result: {
                    productid: result.insertId,
                    ...newBody
                }
            })
        });
    });
}

const deleteProductByKeyIdModel = (id) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM product_item WHERE key_id = '${id}'`;
        pool.query(query, (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 201, result: result});
        })
    })
}

const updateProductModel = (id, body) => {
    return new Promise((resolve, reject) => {
        const data = {
            id: id,
            data: body
        } 
        const query = `UPDATE product_item SET ? WHERE id = ${id}`;
        pool.query(query, [body, id], (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: data});
        })
    })
}

module.exports = {
    getAllProductModel,
    getProductByKeyIdModel,
    addProductModel,
    deleteProductByKeyIdModel,
    updateProductModel,
}