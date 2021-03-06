const LogHelper = require('../helpers/logHelper');
const Department = require('../models/models').Department;
exports.getDepartments = async (req, res , next) => {
    try {
        const departments = await Department.findAll({include:{all:true}});
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
            user_id: req.body.user_id,
            area_id: req.body.area_id
        })
        await LogHelper.write(req.user.id, `New department created: ${newDepartment.title}`, 'departments',newDepartment.id);
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
        const department = await Department.findById(departmentId, {include: {all: true}})
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
        const department = await Department.findByPk(departmentId);
        department.title = req.body.title;
        department.user_id = req.body.user_id;
        department.area_id = req.body.area_id;
        await department.save();
        await LogHelper.write(req.user.id, `Department modified: '${department.title}'`, 'departments',department.id);
        return res.status(200).json({
            message: 'Deparment modified',
            sucess:  true,
            data: department
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
        const department = await Department.findByPk(departmentId);
        await LogHelper.write(req.user.id, `Department removed: '${department.title}'`, 'departments',department.id);
        return res.status(200).json({
            message: 'Department removed',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the department',
            success: false
        })
    }
}