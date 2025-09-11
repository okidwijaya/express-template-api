require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const mainRouter = require('../src/routers/main');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const logger = morgan(':method :url :status :res[content-length] - :response-time ms');

app.use(bodyParser.json());

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:8081", "https://web-commerce-gules.vercel.app", "*"],
    allowedHeaders:[ "x-access-token", "content-type"],
    method: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);
app.use(express.static('pictures'));
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/v1", mainRouter);

// console.log('Connecting to DB with:', {
//     host: "cloudsand.my.id",
//     user: "cloudsan_userroot",
//     password: "2024okicloud",
//     database: "cloudsan_playground_db"
//   });

const connection = mysql.createConnection({
    host: "cloudsand.my.id",
    user: "cloudsan_userroot",
    password: "2024okicloud",
    database: "cloudsan_playground_db"
});

// console.log("Connecting to DB with:", {
//     host: "cloudsand.my.id",
//     user: "cloudsan_userroot",
//     password: "2024okicloud",
//     database: "cloudsan_playground_db",
//   });
  
//   const pool = mysql.createPool({
//     host: "cloudsand.my.id",
//     user: "cloudsan_userroot",
//     password: "2024okicloud",
//     database: "cloudsan_playground_db",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });

connection.connect((err) => {
    if(err){
        console.log('error connecting to db', + err.stack);
        console.log('error connecting to db', + err.message);
        return
    }
    console.log('connected', + connection.threadId);
    console.log('connected successfully');
})

// connection.query('SELECT * FROM cloudsan_playground_db', (error, results, fields) => {
//     if (error) throw error;
//     // console.log('res', results);
//     console.log('res');
//   });

// app.options("/*", (req, res) => {
//   const corsHeader = {
//     "Access-Control-Allow-Origin": "http://localhost:3000",
//     "Access-Control-Allow-Methods": ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
//     "Access-Control-Allow-Headers": "x-access-token",
//   };
//   res.set(corsHeader);
//   res.status(204);
// });