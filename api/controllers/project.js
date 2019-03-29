const DataTable = require('../helpers/SSP');
const User = require('../models/models').User;
const Type = require('../models/models').Type;
const LogHelper = require('../helpers/logHelper');
const Project = require('../models/models').Project;
const Permissions = require('../models/models').Permissions;
const COLUMNS_PROJECTS = require('../dt_definitions/project');
exports.addProject = async (req, res, next) => { 
        try {
            const newProject = await Project.create({
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
            const responsable = await User.findByPk(req.body.user_id);
            await newProject.addUsers(responsable);
            await LogHelper.write(req.user.id, `Project created: ${newProject.code}`, 'projects', newProject.id);
            return res.status(200).json({
                message: 'Project created',
                success: true,
                data: newProject
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Error creating the project',
                success: false,
                error
            })
        }
}
exports.addUserToProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        const user = await User.findById(req.body.user_id);
        await project.addUsers(user, { through: { can_add_viatics: false, can_add_hours: false }})
        await LogHelper.write(req.user.id, `${user.name} was added to the project ${project.code}`, 'projects', project.id);
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
        const message = `${user.name} was removed from project ${project.code}`;
        await LogHelper.write(req.user.id, message, projects, project.id);
        return res.status(200).json({
            message,
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
        const user = await User.findByPk(userId);
        let message = '';
        const user_permissions = await Permissions.findOne({where:{project_id: projectId, user_id: userId}});
        if (permission_type_viatics === 'true' || permission_type_viatics == true){
            user_permissions.can_add_viatics = permission_modified;
            if(permission_modified){
                message = `Permission given to add viatics - ${user.name} ${user.lastname}`;
            }
            else {
                message = `Permission to add viatics removed - ${user.name} ${user.lastname}`;
            }
        }
        else {
            user_permissions.can_add_hours = permission_modified;
            if(permission_modified){
                message = `Permission given to add hours - ${user.name} ${user.lastname}`;
            }
            else {
                message = `Permission to add hours removed - ${user.name} ${user.lastname}`;
            }
        }
        await user_permissions.save();
        await LogHelper.write(req.user.id, message, 'projects', projectId);
        return res.status(200).json({
            message,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: `Error modifying users's permission`,
            success: false,
            error
        })
    }
}
exports.getProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId, {include: {all:true}})
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
        await Project.update(req.body, {where: {id: projectId}});
        const project = await Project.findByPk(projectId);
        if (req.body.extra_comments != ''){
            await Comment.create({project_id: projectId, comment: req.body.extra_comments, user_id: req.user.id});
        }
        await LogHelper.write(req.user.id, `Project updated: ${project.code}`,'projects', project.id);
        return res.status(200).json({
            message: 'Project updated',
            success: true,
            data: project
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
        let wheres;
        const currentUserIsProjectManager = req.user.hasRole('pm');
        if(currentUserIsProjectManager){
            wheres = [`projects_details.status_id = 2`, 'projects_details.type_id in (1,3)', `projects_details.user_id = ${req.user.id}`]
        }
        else {
            wheres = [`projects_details.status_id = 2`, 'projects_details.type_id = 3']
        }
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
        let wheres;
        const rolesCanSeeAll = ['supervisor','admin','super-pm'];
        const canSeeAll = req.user.hasAnyRole(rolesCanSeeAll);
        console.log('\n\n\n \t\tCAN SEE ALL',canSeeAll)
        if(!canSeeAll){
            wheres = [`projects_details.status_id = 2`, 'projects_details.type_id = 2',`projects_details.user_id = ${req.user.id}`]
        }
        else {
            wheres = [`projects_details.status_id = 2`, 'projects_details.type_id = 2']
        }
        console.log("USER ID: ",req.user.id)
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
        const currentuUserIsPm = req.user.hasRole('pm');
        const curentUserIsSPM = req.user.hasRole('super-pm');
        let wheres;
        if(currentuUserIsPm){
            wheres = [`projects_details.status_id = 3`,`projects_details.user_id = ${req.user.id}`];
        }
        else if(curentUserIsSPM){
            wheres = [`projects_details.status_id = 3`,'projects_details.type_id != 1']
        }
        else {
            wheres = [`projects_details.status_id = 3`];
        }
        
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