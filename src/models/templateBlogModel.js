const pool = require('../config/db');
const poolNews = require('../config/dbNews');
const dbPool = require('../config/dbNews');

const getAllArticlesModel = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM articles';
        
        dbPool.query(query, (err, result) => {
            if(err) return reject({status: 500, err});
            if(result.length == 0) return reject({status: 404, result});
            resolve({ status: 200, result: result.length ? result: [] });
        })
    })
}

const getArticleDetailByIdModel = (id) => {
    return new Promise((resolve, reject) => {
        const query= `SELECT * FROM articles WHERE id = '${id}'`;
        poolNews.query(query, (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: result})
        })
    })
}

const deleteArticleDetailIdModel = (id) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM article WHERE id = '${id}'`;
        poolNews.query(query, (err, result) => {
            if(err) return reject({status: 500, err})
            resolve({status: 200, result: result})
        })
    })
}

const updateArticleDetailIdModel = (id, body) => {
    return new Promise((resolve, reject) => {
        const data = {
            id: id,
            data: body
        }
        const query = `UPDATE article SET ? WHERE id = ${id}`;
        poolNews.query(query, [body, id], (err, result) => {
            if(err) return reject({status: 500, err})
            resolve({status: 200, result: data})
        })
    })
}

module.exports = {
    getAllArticlesModel,
    getArticleDetailByIdModel,
    deleteArticleDetailIdModel,
    updateArticleDetailIdModel
}