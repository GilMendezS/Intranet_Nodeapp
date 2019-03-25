const moment = require('moment');
const Hour = require('../models/models').Hour;
const LogHelper = require('../helpers/logHelper');
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
exports.getHistoryHours = async(req, res, next) => {
    try {
        const hours = await Hour.findAll({
            where:{
                user_id: req.user.id
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
        const date_sent = moment(req.body.date);
        const firstDayWeek = moment().startOf('isoWeek');
        const lastDayWeek = moment().endOf('isoWeek');
        const data = req.body;
        if( date_sent.isSameOrAfter(firstDayWeek) && date_sent.isSameOrBefore(lastDayWeek) ){
            data.in_time = true;
        }
        else {
            data.in_time = false;
        }
        const hour = await Hour.create(data);
        const hour_with_associations = await Hour.findByPk(hour.id, {include:{all:true}});
        await LogHelper.write(req.user.id, `Hour(s) registered, total: ${hour.hours}, project: ${hour_with_associations.project.code}`, 'hours',hour.id);
        return res.status(200).json({
            message: 'Hour created',
            data: hour_with_associations,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error saving the Hour',
            error,
            success:false
        });
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
        await LogHelper.write(req.user.id, `Hour(s) updated, total: ${updatedHour.hours}`, 'hours',updatedHour.id);
        return res.status(200).json({
            message: 'Hour updated',
            data: updatedHour,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating the Hour',
            sucess: false
        });
    }
}
exports.removeHour = async (req, res, next) => {
    try {
        const hourId = req.params.id;
        const hour = await Hour.findByPk(hourId, { include: {all: true} });
        await LogHelper.write(req.user.id, `Hour(s) removed, total: ${hour.hours}, project: ${hour.project.code}`, 'hours',hour.id);
        await hour.destroy();
        return res.status(200).json({
            message: 'Hour(s) removed',
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error removing the Hour',
            sucess: false
        });
    }   
}