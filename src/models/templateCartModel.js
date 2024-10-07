const pool = require('../config/db');

const getAllCartByUserIdModel = (id) =>{
    const query = `SELECT * FROM cart WHERE user_id = ${id} AND status = 1`;
    return new Promise((resolve, reject) =>{
        pool.query(query, (err, cartResult) => {
            if(err) return reject({status: 500, err});

            if(cartResult.length === 0){
                resolve({status: 200, message: 'Product not found'});
            }
            // resolve({status: 200, result: result});
            const productsKeyId = cartResult.map(item => item.product_id);
            
            const productQueries = productsKeyId.map(productitemid => {
                const productQuery = `SELECT * FROM product_item WHERE key_id = '${productitemid}'`;
                return new Promise((resolve, reject) => {
                    pool.query(productQuery, (err, productResult) => {
                        if(err) return reject({status: 500, err});
                        resolve(productResult[0])
                    });
                })
            })

            Promise.all(productQueries)
            .then((products) => {
                const result = cartResult.map(cartItem => {
                    const productItem = products.find(product => product.key_id === cartItem.product_id);
                    return {
                        ...cartItem,
                        product: productItem
                    };
                });
                resolve({status: 200, result});
            })
            .catch(err => {
                reject({status: 500, err})
            })
        })
    })
}

const addUserCartModel = (body) => {
    const query = 'INSERT INTO cart SET ?';
    return new Promise((resolve, reject) => {
        pool.query(query,[body],  (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: 'success'});
        });
    })
}

module.exports = {
    getAllCartByUserIdModel,
    addUserCartModel
}