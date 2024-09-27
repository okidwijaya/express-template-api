const { userRegistertrationModel, userLoginModel, usersModel } = require('../models/templateUserModel');

const userRegistertrationController = async (req, res) =>{
    const { body } = req;

    if(!body.email || !body.password){
        return res.status(400).json({error: 'Invalid, email and password are required'});
    }

    userRegistertrationModel(body)
    .then((result) => {
            const bodyRes = {
                id: result.insertId,
                user_name: body.user_name,
                email: body.email,
                role:  result.role
            }
            res.status(201).json({
                message: 'Registration Success',
                res: result.status,
                bodyRes,
            })
    })
    .catch(err =>{
        console.error('Registration Failed' ,err, body);
        res.status({ status: 500, err: err.message });
    })
}

const userLoginController = (req, res) => {
    const { body } = req;
  
    userLoginModel(body)
      .then(({ status, data }) => {
        res.status(status).json({
          msg: "Login Successful",
          data: data,
        });
      })
      .catch(({ status, err }) => {
        res.status(status).json({
          msg: err,
        });
      });
  };


const usersController = (req, res) => {
    usersModel()
    .then(({status, result}) => {
        res.status(status).json({status: status, result: result});
    })
    .catch(err => {
        res.status(500).json({status: 500, err})
    })
};

module.exports = {
    userRegistertrationController,
    userLoginController,
    usersController
}