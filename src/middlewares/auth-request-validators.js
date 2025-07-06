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

module.exports = {
    validateUserAuth
}
