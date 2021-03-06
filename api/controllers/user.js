const User = require('../models/models').User;
const Role = require('../models/models').Role;
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
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {include: {all:true}});
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
        if(req.body.selected_role != ''){
            const givenRole = await Role.findByPk(req.body.selected_role);
            await newUser.addRoles(givenRole);
        }
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
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id, {include: {all:true}});
        const updatedUser = await user.update(req.body)
        return res.status(200).json({
            message: 'User updated',
            success: true,
            data: updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating the user',
            success: false,
            error
        })
    }
}
exports.changeStatusUser = async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({
                message :'User not found',
                success: false
            })
        }
        user.active = req.body.active;
        await user.save();
        const message = req.body.active ? 'User was enabled': 'User was disabled';
        return res.status(200).json({
            message: message,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error disabling the user',
            success: false
        })
    }
}
exports.modifyRoles = async(req, res, next) => {
    try {
        const userId= req.params.id;
        const user = await User.findByPk(userId, {include: ['roles']});
        await user.removeRoles(user.roles);
        const newRoles = await Role.findAll({where:{
            id: req.body.roles
        }})
        await user.addRoles(newRoles);
        return res.status(200).json({
            message: 'Roles were modified',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error modifying the roles user',
            success: false,
            error
        })
    }
}