const validateUserAuth = (req,res,next)=>{

    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            message: "Email and Password are required",
            data:{},
            err:"Email and password missing"
        })
    }
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
            data: {},
            err: "User ID missing"
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}
