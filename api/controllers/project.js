const DataTable = require('../helpers/SSP');
const Type = require('../models/models').Type;
const Project = require('../models/models').Project;
const COLUMNS_PROJECTS = require('../dt_definitions/project');

exports.getProjects = async (req, res, next) => {
    try {
        const datatable = new DataTable();
        const data = await datatable.simple(req, null, 'Projects', 'Projects.id', COLUMNS_PROJECTS);
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