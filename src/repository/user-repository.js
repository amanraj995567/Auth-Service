
const { ValidationError } = require('sequelize');
const {User,Role} = require('../models/index');


class UserRepository{
    
     async create(data){
        try {
            const user = await User.create(data);
            return user;      
        } catch (error) {
            if(error.name=='SequelizeValidationError'){
                throw new ValidationError(error);
            }
          
            console.error("Something went wrong in repo layer");
            throw error;       
        }
     }

     async destroy(userId){
        try {
             await User.destroy({
                where: {
                    id: userId 
                }
            });
            return true;      
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;       
        }
     }

     async getUserById(userId){
        try {
            const user = await User.findByPk(userId);
            return user;      
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;       
        }
     }

     async getUserbyEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email:userEmail
                }
            });
            return user;      
        } catch (error) {
            console.error("Error fetching user by email:", error);
            throw error;    
        }
     }

     async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:'ADMIN'
                }
            })
            return user.hasRole(adminRole);
            
        } catch (error) {
           console.error("Something went wrong in repo layer:", error);
            throw error; 
        }
     }


}

module.exports = {
    UserRepository
}