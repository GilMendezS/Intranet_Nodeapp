const Area  = require('../models/models').Area;
const LogHelper = require('../helpers/logHelper');
exports.getAreas = async(req, res, next) => {
    try {
        areas = await Area.findAll({include: {all:true}})
        return res.status(200).json({
            data: areas
        })
    } catch (error) {
        res.status(500).json({
            message:'Error fetching the areas',
            error
        })
    }
}
exports.getArea = async (req, res, next) => {
    try {
        const areaId = req.params.id;
        const area = await Area.findById(areaId, {include:{all:true}});
        return res.status(200).json({
            data: area
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the area',
            error
        })
    }
}
exports.addArea = async(req, res ,next) => {
    try {
        const area = await Area.build({
            title: req.body.title,
            user_id: req.body.user_id
        }).save()
        await LogHelper.write(req.user.id, `New area was created ${area.title}`, 'areas',area.id);
        return res.status(200).json({
            messsage: 'Area created',
            data: area
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error saving the area',
            error
        })
    }
}
exports.updateArea = async(req, res, next) => {
    try {
        const areaId = req.params.id;
        const area = await Area.findByPk(areaId);
        area.user_id = req.body.user_id;
        area.title = req.body.title;
        await area.save();
        await LogHelper.write(req.user.id, `Information area was updated: ${area.title}`, 'areas',area.id);
        return res.status(200).json({
            message: 'Area updated',
            data: area,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating the area',
            sucess: false
        })
    }
}
exports.removeArea = async (req, res, next) => {
    try {
        const areaId = req.params.id;
        const area = await Area.findByPk(areaId);
        await LogHelper.write(req.user.id, `Information area was removed: ${area.title}`, 'areas',area.id);
        await area.destroy();
        return res.status(200).json({
            message: 'Area removed',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the area',
            sucess: false
        })
    }   
}