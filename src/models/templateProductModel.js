const pool = require('../config/db');

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

const addProductModel = (body, files) => {
    return new Promise((resolve, reject) => {
        console.log(body);
        let user = body.user_id;
        let title = body.title;

        if(files.length === 0) {
            return reject({status: 404, message: 'Image Cannot be Empty'});
        }

        const imagePath = files.map((file, index) => {
            return `${title}-${user}-${index}-${file.originalname}`
        });

        const imagesString = imagePath.join(',');

        const query = 'INSERT INTO product_item SET ?';
        const newBody = {
            ...body,
            image: imagesString,
            key_id: `8293heqejiqkii-${Date.now()}`,
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

const getProductModel = (filters, page, limit) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM product_item p WHERE 1=1`;
        const params = [];

        // Search filter for title and description
        if (filters.search) {
            query += ` AND (p.title LIKE ? OR p.description LIKE ?)`;
            const searchValue = `%${filters.search}%`;
            params.push(searchValue, searchValue);
        }

        // Price filter
        if (filters.price) {
            query += ` AND p.price = ?`; // Assuming exact match for simplicity
            params.push(parseFloat(filters.price));
        }

        // Color filter
        if (filters.color) {
            query += ` AND p.color LIKE ?`;
            params.push(filters.color);
        }

        // Pagination logic
        const offset = (page - 1) * limit;
        params.push(parseInt(limit), parseInt(offset)); // Push LIMIT and OFFSET last
        query += ` LIMIT ? OFFSET ?`;

        console.log('Filters:', filters);
        console.log('Params:', params);
        console.log('Query:', query);

        // Execute the query to get the products
        pool.query(query, params, (err, results) => {
            if (err) {
                console.error(err);
                return reject({ status: 500, message: err.message });
            }

            console.log('Query Results:', results);

            // Count total products based on the same filters
            let countQuery = `SELECT COUNT(*) AS total FROM product_item p WHERE 1=1`;
            const countParams = [];

            // Reapply the same search filter
            if (filters.search) {
                countQuery += ` AND (p.title LIKE ? OR p.description LIKE ?)`;
                const searchValue = `%${filters.search}%`;
                countParams.push(searchValue, searchValue);
            }

            // Add other filters to count query if necessary
            if (filters.price) {
                countQuery += ` AND p.price = ?`; // Assuming exact match for simplicity
                countParams.push(parseFloat(filters.price));
            }

            // Execute count query
            pool.query(countQuery, countParams, (err, countProductResults) => {
                if (err) {
                    console.error(err);
                    return reject({ status: 500, message: err.message });
                }

                const totalProductData = countProductResults[0].total; // Total number of matching products
                const totalPage = Math.ceil(totalProductData / limit); // Total pages based on limit

                console.log('Total Products:', totalProductData, 'Total Pages:', totalPage);

                // Determine next and previous page links
                const nextPage = (page < totalPage) ? page + 1 : null;
                const previousPage = (page > 1) ? page - 1 : null;

                // Build next and previous page links
                const nextPageLink = nextPage ? `/products/find?search=${encodeURIComponent(filters.search)}&page=${nextPage}&limit=${limit}` : null;
                const previousPageLink = previousPage ? `/products/find?search=${encodeURIComponent(filters.search)}&page=${previousPage}&limit=${limit}` : null;

                // Resolve the promise with the results
                resolve({
                    status: 200,
                    result: {
                        products: results,
                        totalProductData,
                        currentPage: page,
                        totalPages: totalPage,
                        nextPage,
                        previousPage,
                        nextPageLink: nextPageLink || "No more pages available",
                        previousPageLink: previousPageLink || "You are on the first page",
                        resultLength: results.length // Length of the resulting data
                    }
                });
            });
        });
    });
};


module.exports = {
    getAllProductModel,
    getProductByKeyIdModel,
    addProductModel,
    deleteProductByKeyIdModel,
    updateProductModel,
    getProductModel
}