const Rfc = require('../models/models').Rfc;
exports.getRfcs = async (req, res, next) => {
    try {
        const rfcs = await Rfc.findAll();
        return res.status(200).json({
            success: true,
            data: rfcs
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Error fetching the information',
            success: false
        })
    }
}
exports.addRfc = async (req, res, next) => {
    try {
        const newRfc = await Rfc.create({
            title: req.body.title,
            rfc: req.body.rfc
        })
        return res.status(200).json({
            message: 'Rfc created correctly',
            succes: true,
            data: newRfc
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating the rfc',
            success: false,
            error
        })
    }
}
exports.updateRfc = async (req, res, next) => {
    try {
        const rfcId = req.params.id;
        const updatedRfc = await Rfc.update(req.body, {
            where: {
                id: rfcId
            },
            returning: true
        })
        return res.status(200).json({
            message: 'Rfc was updated',
            success: true,
            data: updatedRfc
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error modifying the rfc',
            succes: false,
            error
        })
    }
}
exports.disableRfc = async (req, res, next) => {
    try {
        const rfcId = req.params.id;
        const updatedRfc = await Rfc.update({active:false}, {
            where: {
                id: rfcId
            },
            returning: true
        })
        return res.status(200).json({
            message: 'The rfc was disabled',
            success: true,
            data: updatedRfc
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error modifying the rfc',
            succes: false,
            error
        })
    }
}