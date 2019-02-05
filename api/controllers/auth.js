const User = require('../models/models').User;
exports.postLogin = async (req, res ,next) => {
    try {
        const user = await  User.findOne({
                            where: {
                                email: req.body.email
                            }
                        })
        if(!user){
            return res.status(404).json({
                message: 'Email not found',
                success: false
            })
        }
        const result = await user.checkPassword(req.body.password);
        if(result){
            const token = await user.getToken();
            res.status(200).json({
                success:true,
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    lastname: user.lastname,
                    employee_number: user.employee_number,
                    email: user.email,
                    createdAt: user.createdAt
                }
            })
        }
        else {
            return res.status(200).json(
              {
                message: 'Invalid credentials',
                sucess: false
              }
            )
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error checking this credentials',
            error,
            success: false
        })
    }
    
}