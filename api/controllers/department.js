const Department = require('../models/models').Department;

exports.getDepartments = async (req, res , next) => {
    try {
        const departments = await Department.findAll();
        return res.status(200).json({
            data: departments
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the departments',
            error
        })
    }
}
exports.addDepartment = async (req, res, next) => {
    try {
        const newDepartment = await Department.create({
            title: req.body.title,
            user_id: req.body.UserId,
            area_id: req.body.AreaId
        })
        return res.status(200).json({
            message: 'Department created',
            success: true,
            data: newDepartment
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating the department',
            success: false
        })
    }
}
exports.getDepartment = async (req, res, next) => {
    try {
        const departmentId = req.params.id;
        const department = await Department.findById(departmentId, {include: ['User','Area']})
        return res.status(200).json({
            data: department
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetchig the department',
            error
        })
    }
}
exports.updateDepartment = async(req, res, next) => {
    try {
        const departmentId = req.params.id;
        const updatedDepartment = await Department.update(req.body, {where: {id:departmentId}})
        return res.status(200).json({
            message: 'Deparment modified',
            sucess:  true,
            data: updatedDepartment
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error updating the department',
            success: false
        })
    }
}
exports.removeDepartment = async (req, res, next) => {
    try {
        const departmentId = req.params.id;
        await Department.destroy({where:{id: departmentId}});
        return res.status(200).json({
            message: 'Department removed',
            success: true
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error removing the department',
            success: false
        })
    }
}