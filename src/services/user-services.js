const jwt = require('jsonwebtoken');
const {UserRepository} = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');


class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async createUser(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.error("Error in UserService while creating user:", error);
            throw error;
        }
    }

    createToken(user){
        try {

            const result = jwt.sign(user, JWT_KEY,{
                expiresIn: '1d' // Token will expire in 1 hour
            });
            return result;
            
        } catch (error) {

            console.log("Something went wrong while creating token");
            throw error;
            
        }
    }


    verifyToken(token){
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.error("Error verifying token:", error);
            throw error;
        }
    }

    
}

module.exports = UserService;