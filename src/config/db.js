const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "cloudsand.my.id",
  user: "cloudsan_userroot",
  password: "2024okicloud",
  database: "cloudsan_playground_db",
});

module.exports = pool;
