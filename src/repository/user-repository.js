const {User} = require('../models/index');


class UserRepository{
    
     async create(data){
        try {
            const user = await User.create(data);
            return user;      
        } catch (error) {
            console.error("Error creating user:", error);
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
}

module.exports = {
    UserRepository
}