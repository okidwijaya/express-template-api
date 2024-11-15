const { userRegistertrationModel, userLoginModel, usersModel, getUserByIdModel, updateUserModel } = require('../models/templateUserModel');

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

const getUserByIdController = (req, res) => {
  const { id } = req.params;

  getUserByIdModel(id)
  .then(({status, result}) => {
      res.status(200).json({
          status: status,
          result: result
      })
  })
  .catch(err => {
      res.status(500).json({
          message: 'Internal Server Error',
          error: err
      });
  });
}

const updateUserController = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  
  updateUserModel(id, body)
  .then(({status, result}) => {
      res.status(status).json({
          status: status,
          result: result,
          message: 'Update User Success'
      })
  })
  .catch(err => {
      res.status(500).json({
          message: 'Internal Server Error',
          error: err
      });
  });
}

module.exports = {
    userRegistertrationController,
    userLoginController,
    usersController,
    getUserByIdController,
    updateUserController
}