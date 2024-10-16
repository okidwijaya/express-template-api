const pool = require('../config/db');

const getAllTransactionModel = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM transaction';
        pool.query(query, (err, result) => {
            if(err)return reject({status: 500, err});
            if(result.length == 0) return reject({status: 404, result});
            resolve({ status: 200, result: result.length ? result : [] });
        })
    })
}

const addTransactionModel = (body) => {
    const user = body.user_id;
    const product = JSON.stringify(body.products_detail);
    const orderid = `${user}-${Date.now()}`;
    const newBody = {
        ...body,
        order_number: orderid,
        products_detail: product,
    }

    console.log('newBody', newBody);
    const query = 'INSERT INTO transaction SET ?';
    return new Promise((resolve, reject) => {
        pool.query(query,[newBody],  (err, transactionResult) => {
            if(err) return reject({status: 500, err});
            
            if(body.products_detail.length === 0) {
                return reject({status: 500, err});
            }
            // resolve({status: 200, result: 'success' + transactionResult});
            const transactionRecords = body.products_detail.map(productItem => {
                let transactionHistoryBody = {
                    transaction_id: orderid,
                    status: body.status,
                    user_id: body.user_id,
                    product_id: `${productItem.product}`,
                    qty: `${productItem.qty}`,
                    variant: `${productItem.variant}`
                }

                const recordQuery = `INSERT INTO product_order_history SET ?`;
                return new Promise((resolve, reject) => {
                    pool.query(recordQuery, [transactionHistoryBody], (err, result) => {
                        if(err) return reject({status: 500, error: err});
                        resolve(result);
                    });
                });
            })

            Promise.all(transactionRecords)
            .then((history) => {
                const result = {
                    transaction: transactionResult,
                    history: history
                }
                return resolve({status: 200, result: result});
            })
            .catch(err => {
                reject({status: 500, err: err});
            })
        });
    })
}

module.exports = {
    addTransactionModel,
    getAllTransactionModel
}