// models/items.js
const axios = require("axios");
const pool = require("../config/db");

const unilandModelsApi = async({ name, product, date, limit, offset }) => {
    try {
        const response = await axios.get(
        "https://sandbox2expatify.com/uniland/gate/warranty_list_admin",
        {
            params: {
            name,
            product,
            date,
            limit,
            offset,
            },
        }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const unilandGetAllDataWarranty = async (searchParams) => {
        let query = 'SELECT * FROM tb_warranty_registration WHERE 1=1';
        const queryParams = [];

        if (searchParams.name) {
          query += ' AND name LIKE ?';
          queryParams.push(`%${searchParams.name}%`);
        }
        if (searchParams.email) {
          query += ' AND email LIKE ?';
          queryParams.push(`%${searchParams.email}%`);
        }
        if (searchParams.phone) {
          query += ' AND phone LIKE ?';
          queryParams.push(`%${searchParams.phone}%`);
        }
        if (searchParams.purchase_date) {
          query += ' AND purchase_date = ?';
          queryParams.push(searchParams.purchase_date);
        }
        if (searchParams.product) {
          query += ' AND product LIKE ?';
          queryParams.push(`%${searchParams.product}%`);
        }
        if (searchParams.invoice) {
          query += ' AND invoice LIKE ?';
          queryParams.push(`%${searchParams.invoice}%`);
        }
        if (searchParams.purchase_location) {
          query += ' AND purchase_location LIKE ?';
          queryParams.push(`%${searchParams.purchase_location}%`);
        }

        query += ' LIMIT ? OFFSET ?';
        queryParams.push(searchParams.limit, searchParams.offset);

        const connection = await pool.getConnection();
        try{
          const [result] = await connection.query(query, queryParams);
          const [countResult] = await connection.query(
            'SELECT COUNT(*) AS total FROM tb_warranty_registration WHERE 1=1',
            queryParams.slice(0, -2)
          )

          const total = countResult[0].total;

          if(result.length === 0){
            return { status: 400, err: 'data not found' };
          }

          return { status: 200, result, total };
        }catch(e){
          return { status: 500, err: err}
        }finally{
          connection.release();
        }
};

const unilandPostRegisterWarranty = async (newBody) => {
  const sqlQuery = `INSERT INTO tb_warranty_registration SET ?`;

  const connection = await pool.getConnection();
  try {
      const [result] = await connection.query(sqlQuery, newBody);
      return { status: 200, result };
  } catch (error) {
      return { status: 500, err: error };
  } finally {
      connection.release();
  }
};

module.exports = {
  unilandModelsApi,
  unilandPostRegisterWarranty,
  unilandGetAllDataWarranty
};
