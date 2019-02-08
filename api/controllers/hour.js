const Hour = require('../models/models').Hour;
const moment = require('moment');
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
exports.getHoursOftheDay = async (req, res, next) => {
    try {
        const hours = await Hour.findAll({
            where:{
                user_id: req.user.id, 
                created_at: { 
                    "$between": [
                        moment().format('YYYY-MM-DD 00:00:00'),
                        moment().format('YYYY-MM-DD 23:59:59')]
                }
            },
            include: {all:true}
        })
        return res.status(200).json({
            data: hours
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching your hours',
            error,
            success: false
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