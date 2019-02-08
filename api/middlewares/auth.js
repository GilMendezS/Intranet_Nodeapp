const jwt = require('jsonwebtoken');
module.exports =  async (req, res, next) => {
    const token = req.headers.authorization;
    if  (token){
        try {
            const user = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = user;
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
            succss: false
        })
    }
}