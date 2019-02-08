const Hour = require('../models/models').Hour;
exports.getHours = async(req, res, next) => {
    try {
        const hours = await Hour.findAll({include: {all:true}})
        return res.status(200).json({
            data: hours
        })
    } catch (error) {
        res.status(200).json({
            message:'Error fetching the Hours',
            error
        })
    }
}
exports.getHour = async (req, res, next) => {
    try {
        const hourId = req.params.id;
        const hour = await Hour.findById(hourId, {include: {all:true}});
        return res.status(200).json({
            data: hour,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching the Hour',
            error,
            sucess:false
        })
    }
}
exports.addHour = async(req, res ,next) => {
    try {
        const hour = await Hour.create(req.body);
        return res.status(200).json({
            messsage: 'Hour created',
            data: hour
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error saving the Hour',
            error
        })
    }
}
exports.updateHour = async(req, res, next) => {
    try {
        const hourId = req.params.id;
        const updatedHour = await Hour.update(req.body, {
            where: {
                id: hourId
            },
            returning: true
        })
        return res.status(200).json({
            message: 'Hour updated',
            data: updatedHour,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating the Hour',
            sucess: false
        })
    }
}
exports.removeHour = async (req, res, next) => {
    try {
        await Hour.destroy({where:{
            id: req.params.id
        }})
        return res.status(200).json({
            message: 'Hour removed',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the Hour',
            sucess: false
        })
    }   
}