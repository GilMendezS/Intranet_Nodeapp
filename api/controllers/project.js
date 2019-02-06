const DataTable = require('../helpers/SSP');
const Type = require('../models/models').Type;
const COLUMNS_PROJECTS = require('../dt_definitions/project');

exports.getActiveProjects = async (req, res, next) => {
    try {
        const datatable = new DataTable();
        const wheres = [`projects_details.status_id = 2`, 'projects_details.type_id = 3']
        const data = await datatable.simple(req, null, 'projects_details', 'projects_details.id', COLUMNS_PROJECTS, wheres);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            message:'Error fetching the projects',
            error
        })
    }
}
exports.getActiveSales = async (req, res, next) => {
    try {
        const datatable = new DataTable();
        const wheres = [`projects_details.status_id = 2`, 'projects_details.type_id = 2']
        const data = await datatable.simple(req, null, 'projects_details', 'projects_details.id', COLUMNS_PROJECTS, wheres);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            message:'Error fetching the projects',
            error
        })
    }
}
exports.getActiveBudgets = async (req, res, next) => {
    try {
        const datatable = new DataTable();
        const wheres = [`projects_details.status_id = 2`, 'projects_details.type_id = 1']
        const data = await datatable.simple(req, null, 'projects_details', 'projects_details.id', COLUMNS_PROJECTS, wheres);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            message:'Error fetching the projects',
            error
        })
    }
}

exports.getTypes = async(req, res, next) => {
    try {
        const types = await Type.findAll();
        return res.status(200).json({
            sucess: true,
            data: types
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the projects types',
            success: false
        })
    }
}