const Project = require('../models/models').Project;
const Type = require('../models/models').Type;


exports.getProjects = async (req, res, next) => {
    try {
        const projects = await Project.findAll();
        return res.status(200).json({
            data: projects
        })
    } catch (error) {
        return res.status(500).json({
            message:'Error fetching the projects'
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