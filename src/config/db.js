const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "cloudsand.my.id",
  user: "cloudsan_userroot",
  password: "2024okicloud",
  database: "cloudsan_playground_db",
  port: 3306
});

pool.getConnection((err, connection) => {
  if (err) {
      console.error('Error connecting to the database:', err);
      return;
  }
  console.log('Connected to the database!');
  connection.release();
});

module.exports = pool;
