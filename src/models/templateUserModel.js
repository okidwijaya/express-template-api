const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistertrationModel = (body) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO user SET ?";

    let passwodConverter;
    if (typeof body.password === "number") {
      passwodConverter = body.password.toString();
    } else {
      passwodConverter = body.password;
    }

    bcrypt
      .hash(passwodConverter, 10)
      .then((hashedPassword) => {
        const newBody = {
          ...body,
          role: "user",
          password: hashedPassword,
        };
        pool.query(query, newBody, (err, result) => {
          if (err) return reject({ status: 500, err: err });
            resolve({ status: 201, result: result, role: newBody.role });
        });
      })
      .catch((err) => {
        reject({ status: 500, err: err });
      });
  });
};

const userLoginModel = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;

    const query = `SELECT * FROM user WHERE ?`;

    pool.query(query, [{ email }], async (err, result) => {
      if(err) return reject({status: 500, err});
      if(result.length === 0) return reject({status: 401, message: 'Wrong Email/Password'});

      try{
        const hashedPassword = result[0].password;
        const checkPassword = await bcrypt.compare(password, hashedPassword);
        console.log(checkPassword)
        if(checkPassword){
          const payload = {
            id: result[0].id,
            role: result[0].role,
          }

          const jwtOptions = {
            expiresIn: "5h",
            issuer: process.env.ISSUER
          }

          jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
            if(err) return reject({status: 500, err: 'Invalid Email/Password', error: err});
            const data = {
              token, 
              id: payload.id,
              role: payload.role,
              email: result[0].email,
              name: result[0].name
            }
            resolve({status: 200, data: data})
          });
        }else {
          reject({ status: 401, err: "Invalid Email/Password" });
        }
      }catch(err){
        reject({status: 500, err: err.message});
      }
    });
  });
};

const findUserByEmail = (email) => {
  const query = "SELECT * FROM user WHERE email = ?";
  return new Promise((resolve, reject) => {
    pool.query(query, [email], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows[0]);
    });
  });
};

const usersModel = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM user";

    pool.query(query, (err, result) => {
        if (result.length == 0) {
          return reject({ status: 404, message: "No users", err: err });
        }
        resolve({ status: 200, result });
      })
  });
};

module.exports = {
  userRegistertrationModel,
  findUserByEmail,
  userLoginModel,
  usersModel,
};
