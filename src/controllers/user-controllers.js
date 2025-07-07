const { response }    = require('express');

const UserService = require('../services/user-services'); // Step 1
const userService = new UserService();                   // Step 2

 const  create =  async (req, res) => {
    try {
      const response = await userService.createUser(req.body); // using the instance
      return res.status(201).json({
        success: true,
        data: response,
        message: 'Successfully created user',
      });
    } catch (error) {
      //console.error('Error in create user controller:', error);
      return res.status(error.statusCode).json({
        success: false,
        data:{},
        message: error.message,
        err:error.explanation
      });
    }
}

const signIn = async (req,res)=>{
    try {

        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            message: 'Successfully signed in'
        }) 
        
    } catch (error) {
        console.error('Error in signIn controller:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in signIn controlller'
        });
        
    }
}

const isAuthenticated = async (req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);  
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:'user is authenticated and token is valid'
        })

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data:{},
            err:error
        });
        
    }

    const isAdmin = async (req,res)=>{
        try {
             const response = await userService.isAdmin(req.body.userId);
             return res.status(200).json({
                data:response,
                err:{},
                message:"User is a admin",
                success:true
             })

            
        } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data:{},
            err:error
        });
            
        }
    }
}

module.exports = {
     create,
     signIn,
     isAuthenticated,
     isAdmin
}
