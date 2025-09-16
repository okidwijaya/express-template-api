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
        dbPool.query(query, (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: result})
        })
    })
}

const getArticleDetailBySlugModel = (slug) => {
    return new Promise((resolve, reject) => {
        const query= `SELECT * FROM articles WHERE slug = '${slug}'`;
        dbPool.query(query, (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: result})
        })
    })
}


const deleteArticleDetailIdModel = (id) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM article WHERE id = '${id}'`;
        dbPool.execute(query, (err, result) => {
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
        dbPool.execute(query, [body, id], (err, result) => {
            if(err) return reject({status: 500, err})
            resolve({status: 200, result: data})
        })
    })
}

const addArticleModel = (body) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO articles SET ?';
        dbPool.execute(query, [body], (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: {id: result.insertId, body}})
        })
    })
}

const addArticleTagModel = (body) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO articles_tags SET ?';
        dbPool.execute(query, [body], (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: {id: result.insertId, body}})
        })
    })
}

const addBlogAuthorModel = (body) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO authors SET ?';
        dbPool.execute(query, [body], (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: {id: result.insertId, body}})
        })
    })
}

const addBlogTagModel = (body) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO tags SET ?';
        dbPool.execute(query, [body], (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: {id: result.insertId, body}})
        })
    })
}

const addBlogCategoriesModel = (body) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO categories SET ?';
        dbPool.execute(query, [body], (err, result) => {
            if(err) return reject({status: 500, err});
            resolve({status: 200, result: {id: result.insertId, body}})
        })
    })
}

module.exports = {
    getAllArticlesModel,
    getArticleDetailByIdModel,
    deleteArticleDetailIdModel,
    updateArticleDetailIdModel,
    addArticleModel,
    addArticleTagModel,
    addBlogAuthorModel,
    addBlogCategoriesModel,
    addBlogTagModel,
    getArticleDetailBySlugModel
}