const jwt = require('jsonwebtoken');
const {UserRepository} = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');


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

    async signIn(email,plainPassword){
        try {

            const user = await this.userRepository.getUserbyEmail(email);
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            
            if(!passwordMatch){
                console.log("Password does not match");
                throw {error: "Incorrect Password"};
            }
            
            const newJWT = this .createToken({
                id: user.id,
                email: user.email
            })


            return newJWT;



        } catch (error) {
            console.error("Error in UserService while signing in:", error);
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

    checkPassword(userPlainPassword, userHashedPassword){
        try {
            return bcrypt.compareSync(userPlainPassword, userHashedPassword);        
        } catch (error) {
            console.error("Error checking password:", error);
            throw error;  
        }
    }


}

module.exports = UserService;