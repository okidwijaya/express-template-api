const { findUserByEmail } = require('../models/templateUserModel');

const checkExistingEmail = (req, res, next) => {
    const { email } = req.body;

    if(!email) {
        return res.status(400).json({message: 'Email required'})
    }

    findUserByEmail(email)
    .then(existingUser => {
        if(existingUser) {
            return res.status(409).json({message: 'Email already registered'});
        }
        next();
    })
    .catch(err => {
        console.error(err, 'Error registering server err');
        return res.status(500).json({message: 'Internal Server Error', err})
    })
}

module.exports = {
    checkExistingEmail
}