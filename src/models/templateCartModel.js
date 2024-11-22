const pool = require('../config/db');

const getAllCartByUserIdModel = (id) =>{
    const query = `SELECT * FROM cart WHERE user_id = ${id} AND status = 1`;
    return new Promise((resolve, reject) =>{
        pool.query(query, (err, cartResult) => {
            if(err) return reject({status: 500, err});

            if(cartResult.length === 0){
                return resolve({ status: 200, result: [] });
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

const deleteCartByKeyIdModel = (id) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM cart WHERE id = '${id}'`;
        console.log(query);
        pool.query(query, (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 201, result: result});
        })
    })
}

const deleteCartItemsModel = (items) => {
    const placeholders = items.map(() => '?').join(',');
    const query = `DELETE FROM cart WHERE id IN (${placeholders})`;

    console.log('Executing query:', query, 'with items:', items);

    return new Promise((resolve, reject) => {
        pool.query(query, items, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return reject({ status: 500, err });
            }

            if (result.affectedRows === 0) {
                console.warn('No rows affected. Check if IDs exist.');
                return reject({ status: 404, err: 'No rows matched the provided IDs.' });
            }

            resolve({ status: 201, result });
        });
    });
};


const removeitems = (items) => {
    console.log('itemsmodel', items); 
    const placeholders = items.map(() => '?').join(',');
    const query = `DELETE FROM cart WHERE id IN (${placeholders})`;

    console.log('Query:', query); 

    return new Promise((resolve, reject) => {
        pool.query(query, items, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return reject({ status: 500, err });
            }
            resolve({ status: 201, result });
        });
    });
}


const updateCartModel = (id, body) => {
    return new Promise((resolve, reject) => {
        const data = {
            id: id,
            data: body
        } 
        const query = `UPDATE cart SET ? WHERE id = ${id}`;
        pool.query(query, [body, id], (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: data});
        })
    })
}

module.exports = {
    getAllCartByUserIdModel,
    addUserCartModel,
    deleteCartByKeyIdModel,
    deleteCartItemsModel,
    updateCartModel,
    removeitems
}