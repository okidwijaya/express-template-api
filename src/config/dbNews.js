const mysql = require("mysql2");

const poolNews = mysql.createPool({
  host: "cloudsand.my.id",
  user: "cloudsan_userroot",
  password: "2024okicloud",
  database: "cloudsan_teksy_news",
  port: 3306
});

poolNews.getConnection((err, connection) => {
  if (err) {
      console.error('Error connecting to the database:', err);
      return;
  }
  console.log('Connected to the news database!');
  connection.release();
});

module.exports = poolNews;
