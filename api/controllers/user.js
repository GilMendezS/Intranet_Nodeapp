const User = require('../models/models').User;
exports.getUsers = async (req, res ,next) =>  {
    try {
        const users = await User.findAll({include:[{all:true}]});
        return res.status(200).json({
            data: users,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the users',
            success: false
        })
    }
}
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {include: {all:true}});
        return res.status(200).json({
            data: user,
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
exports.addUser = async (req, res ,next) => {
    try {
        const newUser = await User.create({
            ...req.body,
            active : true
        })
        const userWithRelationships = await User.findByPk(newUser.id, {include:{all:true}})
        return res.status(200).json({
            message: 'User created',
            data: userWithRelationships
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something was wrong',
            error: error
        })
    }
    
}