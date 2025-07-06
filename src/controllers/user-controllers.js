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
      console.error('Error in create user controller:', error);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
}


module.exports = {
     create
}
