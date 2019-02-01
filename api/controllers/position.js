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