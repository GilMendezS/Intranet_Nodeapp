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
exports.addArea = async(req, res ,next) => {
    try {
        const area = await Area.build({
            title: req.body.title,
            user_id: 1
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