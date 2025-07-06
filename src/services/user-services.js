const {UserRepository} = require('../repository/user-repository');


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
}

module.exports = UserService;