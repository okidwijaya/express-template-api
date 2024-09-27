const Connection = require("mysql/lib/Connection");
const mysql = require("mysql2/promise");

console.log("Connecting to DB with:", {
  host: "cloudsand.my.id",
  user: "cloudsan_userroot",
  password: "2024okicloud",
  database: "cloudsan_playground_db",
});

const pool = mysql.createPool({
  host: "cloudsand.my.id",
  user: "cloudsan_userroot",
  password: "2024okicloud",
  database: "cloudsan_playground_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// const testdb = async (req, res) => {
//   try {
//     const [getProductTesting] = await pool.query(
//       "SELECT * FROM product_item"
//     );
//     res.json(getProductTesting)
//   } catch (err){
//     console.error(err);
//     res.status(500).json({err: 'Error'});
//   }
// };

// const getTables = async (req, res) => {
//   try {
//     const [tables] = await pool.query("SHOW TABLES");
//     const tableNames = tables.map(row => Object.values(row)[0]);  // Extract just the table names
//     res.json(tableNames);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: 'Error fetching tables' });
//   }
// };

// const testdbconnect = async (req, res) => {
//   try{
//     const conn = pool.getConnection();
//     conn.release;
//   }catch (err){
//     console.log(err);
//   }
// };

const testdb = async () => {
  try {
    const [getProductTesting] = await pool.query("SELECT * FROM product_item");
    console.log("Product items:", getProductTesting);
  } catch (err) {
    console.error("Error fetching product items:", err);
  }
};

const getTables = async () => {
  try {
    const [tables] = await pool.query("SHOW TABLES");
    const tableNames = tables.map(row => Object.values(row)[0]);  // Extract just the table names
    console.log("Tables in database:", tableNames);
  } catch (err) {
    console.error("Error fetching tables:", err);
  }
};

const testdbconnect = async () => {
  try {
    const conn = await pool.getConnection();
    conn.release();
    console.log("Connection successful");
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
};

testdbconnect()
testdb()
getTables()

// module.exports = pool;
