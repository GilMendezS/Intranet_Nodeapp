const LogHelper = require('../helpers/logHelper');
const Position = require('../models/models').Position;
exports.getPositions = async (req, res, next) => {
    try {
        const positions = await Position.findAll({include: {all:true}});
        return res.status(200).json({
            data: positions
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the positions',
            error
        })
    }
}
exports.addPosition = async (req, res, next) => {
    try {
        const newPosition = await Position.create({
            title: req.body.title,
            department_id: req.body.department_id,
            area_id: req.body.area_id
        })
        await LogHelper.write(req.user.id, `Position created: '${newPosition.title}'`, 'positons', newPosition.id);
        return res.status(200).json({
            message: 'Position cretaed',
            data: newPosition,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating the position',
            error
        })
    }
}
exports.getPosition = async (req, res, next) => {
    try {
        const positionId = req.params.id;
        const position = await Position.findById(positionId, {include:{all:true}})
        return res.status(200).json({
            data: position
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the position',
            error
        })
    }
}
exports.updatePosition = async (req, res, next) => {
    try {
        const positionId = req.params.id;
        const position = await Position.findByPk(positionId);
        position.title = req.body.title;
        position.department_id = req.body.department_id;
        position.area_id = req.body.area_id;
        await position.save();
        await LogHelper.write(req.user.id, `Position updated: ${position.title}`, 'positions',position.id);
        return res.status(200).json({
            message: 'Position updated',
            success: true,
            data: updatedPosition
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating the position',
            error
        })
    }
}
exports.removePosition = async (req, res, next) => {
    try {
        const positionId = req.params.id;
        const position = await Position.findByPk(positionId);
        await LogHelper.write(req.user.id, `Position removed : ${position.title}`, 'positions', position.id);
        await position.destroy();
        return res.status(200).json({
            message: 'Position removed',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the position',
            error
        })
    }
}