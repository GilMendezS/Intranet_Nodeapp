const Area = require('../models/models').Area;
exports.getAreas = async(req, res, next) => {
    try {
        areas = await Area.findAll()
        return res.status(200).json({
            data: areas
        })
    } catch (error) {
        res.status(200).json({
            message:'Error fetching the areas',
            error
        })
    }
}
exports.getArea = async (req, res, next) => {
    try {
        const areaId = req.params.id;
        const area = await Area.findById(areaId, {include:['User']});
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
            UserId: 1
        }).save()
        return res.status(200).json({
            messsage: 'Area created',
            data: area
        })
    } catch (error) {
        return res.status.json({
            message: 'Error saving the area',
            error
        })
    }
}