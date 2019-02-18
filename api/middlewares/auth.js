const jwt = require('jsonwebtoken');
const User = require('../models/models').User;
module.exports =  async (req, res, next) => {
    const token = req.headers.authorization;
    if  (token){
        try {
            const user = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findByPk(user.id, {include:{all:true}});
            
            next();
        } catch (error) {
            return res.status(401).json({
                error
            })
        }
    }
    else {
        return res.status(400).json({
            message: 'Token not provided',
            success: false
        })
    }
}