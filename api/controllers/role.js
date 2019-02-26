const Role = require('../models/models').Role;
exports.getRoles = async (req, res, next) => {
    try {
        const roles = await Role.findAll();
        return res.status(200).json({
            data: roles,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the roles',
            success: false
        })
    }
}