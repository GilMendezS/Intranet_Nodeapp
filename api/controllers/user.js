const User = require('../models/models').User;
exports.getUsers = (req, res ,next) =>  {
    User.findAll()
    .then(users => {
        return res.status(200).json(
            {data: users}
        )
    })
    .catch(err => {
        return res.status(500).json({
            message: 'Error fetching the users',
            success: false
        })
    })
}
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {include: {all:true}});
        return res.status(200).json({
            data: area,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the user',
            success: false,
            error
        })
    }
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
        return res.status(500).json({
            message: 'Something was wrong',
            error: err
        })
    })
}