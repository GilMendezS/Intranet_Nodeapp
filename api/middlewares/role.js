module.exports = (roles) => {
    return (req, res, next) => {
        let stopRequest = false;
        const rolesUser = req.user.roles.map( r => r.name);
        if(Array.isArray(roles)){
            stopRequest = !rolesUser.some( r => roles.includes(r));
        }
        else {
            stopRequest = !rolesUser.includes(roles);
        }
        if(stopRequest){
            return res.status(403).json({
                message: 'You dont have permissions',
                success: false
            });
        }
        else {
            next();
        }
    }
}