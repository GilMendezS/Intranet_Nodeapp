const Status = require('../models/models').Status;

exports.getStatuss = async (req, res, next) => {
    try {
        const statuses = await Status.findAll();
        return res.status(200).json({
            data: statuses
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error fetching the statuses',
            error
        })
    }
}
exports.addStatus = async (req, res, next) => {
    try {
        const newStatus = await Status.create({
            title: req.body.title,
            name: req.body.name
        })
        return res.status(200).json({
            message: 'Status cretaed',
            data: newStatus,
            success: true
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error creating the status',
            error
        })
    }
}
exports.getStatus = async (req, res, next) => {
    try {
        const statusId = req.params.id;
        const status = await Status.findById(statusId)
        return res.status(200).json({
            data: status
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error fetching the status',
            error
        })
    }
}
exports.updateStatus = async (req, res, next) => {
    try {
        const statusId = req.params.id;
        const updatedStatus = await Status.update(req.body, {where: {id: statusId}});
        return res.status(200).json({
            message: 'Status updated',
            success: true,
            data: updatedStatus
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error updating the status',
            error
        })
    }
}
exports.removeStatus = async (req, res, next) => {
    try {
        const statusId = req.params.id;
        await Status.destroy({where:{id:statusId}});
        return res.status(200).json({
            message: 'Status removed',
            success: true
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error removing the status',
            error
        })
    }
}