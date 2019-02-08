const Type = require('../models/models').Type;
const Project = require('../models/models').Project;
const User = require('../models/models').User;
const DataTable = require('../helpers/SSP');
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
                comment: req.body.extra_comments// pending
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
            success: true,
            data: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                project_user:{
                    project_id: project.id,
                    user_id: user.id,
                    can_add_hours: false,
                    can_add_viatics: false
                }
            }
            
        })
        
    } catch (error) {
        return res.status(500).json({
            message:'Error adding the user',
            error,
            success:false
        })
    }
}
exports.removeUserFromProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        const user = await User.findByPk(req.body.user_id);
        await project.removeUsers(user);
        return res.status(200).json({
            message: `${user.name} was removed from project ${project.code}`,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the user',
            error,
            success:false
        })
    }
}
exports.modifyPermissions = async (req, res, next) => {
    try {
        const userId = req.body.user_id;
        const projectId = req.params.id;
        const permission_type_viatics = req.body.is_viatic;
        const permission_modified = req.body.permission;
        const user_permissions = await Permissions.findOne({where:{project_id: projectId, user_id: userId}});
        if (permission_type_viatics === 'true' || permission_type_viatics == true){
            user_permissions.can_add_viatics = permission_modified;
        }
        else {
            user_permissions.can_add_hours = permission_modified;
        }
        await user_permissions.save();
        return res.status(200).json({
            message: 'Permissions updated',
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error modifying permission's user`,
            success: error
        })
    }
}
exports.getProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId, {include: [{
            model: Comment,
            as: 'comments',
            include: ['user']
        },'users','status','type']})
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
exports.updateProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const updatedProject = await Project.update(req.body, {where: {id: projectId}});
        if (req.body.extra_comments != ''){
            await Comment.create({project_id: projectId, comment: req.body.extra_comments, user_id: req.body.user_id});//TODO - pending to get user form request
        }
        return res.status(200).json({
            message: 'Project updated',
            success: true,
            data: updatedProject
        })        
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating the project',
            success: false
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
exports.getProjectByUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);
        const projects = await user.getProjects();
       
       return res.status(200).json({
           data : projects,
           success: true
       })
    } catch (error) {
        return res.status(200).json({
            message: 'Error fetching the projects',
            success: false,
            error
        })
    }
}