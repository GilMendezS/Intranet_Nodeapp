const Position = require('../models/models').Position;

exports.getPositions = async (req, res, next) => {
    try {
        const positions = await Position.findAll();
        return res.status(200).json({
            data: positions
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error fetching the positions',
            error
        })
    }
}
exports.addPosition = async (req, res, next) => {
    try {
        const newPosition = await Position.create({
            title: req.body.title,
            department_id: req.body.DepartmentId,
            area_id: req.body.AreaId
        })
        return res.status(200).json({
            message: 'Position cretaed',
            data: newPosition,
            success: true
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error creating the position',
            error
        })
    }
}
exports.getPosition = async (req, res, next) => {
    try {
        const positionId = req.params.id;
        const position = await Position.findById(positionId, {include:['Department','Area']})
        return res.status(200).json({
            data: position
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error fetching the position',
            error
        })
    }
}
exports.updatePosition = async (req, res, next) => {
    try {
        const positionId = req.params.id;
        const updatedPosition = await Position.update(req.body, {where: {id: positionId}});
        return res.status(200).json({
            message: 'Position updated',
            success: true,
            data: updatedPosition
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error updating the position',
            error
        })
    }
}
exports.removePosition = async (req, res, next) => {
    try {
        const positionId = req.params.id;
        await Position.destroy({where:{id:positionId}});
        return res.status(200).json({
            message: 'Position removed',
            success: true
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error removing the position',
            error
        })
    }
}