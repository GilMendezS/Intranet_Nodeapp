const DataTable = require('../helpers/SSP');
const Type = require('../models/models').Type;
const User = require('../models/models').User;
const Project = require('../models/models').Project;
const COLUMNS_PROJECTS = require('../dt_definitions/project');

exports.addProject = (req, res, next) => { 
        Project.create({
            name: req.body.name,
            code: req.body.code,
            client: req.body.client,
            user_id: req.body.user_id,
            status_id: 2,//default - active
            type_id: req.body.type_id,
            budget: req.body.budget,
            comments: {
                user_id: req.body.user_id,
                comment: req.body.comments
            }
        },
        {
            include: [{
                association: Project.Comments,
            }]
        }
        )
        .then(project => {
            return res.status(200).json({
                message: 'Project created',
                success: true,
                data: project
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: 'Error creating the project',
                success: false,
                error
            })
        })
}
exports.addUserToProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        const user = await User.findById(req.body.user_id);
        
        await project.addUsers(user, { through: { can_add_viatics: false, can_add_hours: false }})
        return res.status(200).json({
            message: `${user.name} was added to the project ${project.code}`,
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Error adding the user',
            error
        })
    }
}
exports.getProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId, {include: ['comments']})
        return res.status(200).json({
            data: project
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error fetching the project',
            success: false,
            error
        })
    }
}
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
exports.getFinishedProjects = async (req, res, next) => {
    try {
        const datatable = new DataTable();
        const wheres = [`projects_details.status_id = 3`]
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