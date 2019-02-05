const path = require('path');
const rootDir = require('../utils/path');
const sequelize = require('../utils/database');

const User = sequelize.import(path.join(rootDir,'models','user.js'))

exports.getUsers = (req, res ,next) =>  {
    User.findAll()
    .then(users => {
        return res.status(200).json(
            {data: users}
        )
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            message: 'Error fetching the users',
            success: false
        })
    })
}

exports.addUser = (req, res ,next) => {
    User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        employee_number: req.body.employee_number
    })
    .then(user => {
        return res.status(200).json({
            message: 'User created successfully!',
            success: true,
            user
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            message: 'Something was wrong',
            error: err
        })
    })
}