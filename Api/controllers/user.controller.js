import userRepository from "../repository/user.repository.js";
import { checkValidation } from "../middleware/validation.middleware.js";

class UserController {
    getAllUsers = async (req, res, next) => {
        const response = await userRepository.findAllUser();
        res.send(response);
    }

    getUserById = async (req, res, next) => {
        checkValidation(req);
        const id = parseInt(req.params.id, 10);
        const response = await userRepository.findOneUser({ id });
        res.send(response);
    }

    createUser = async (req, res, next) => {
        checkValidation(req);
        const response = await userRepository.createUser(req.body);
        res.send(response);
    }

    updateUser = async (req, res, next) => {
        checkValidation(req);
        const response = await userRepository.updateUser(req.body, { id: parseInt(req.params.id, 10) }); 
        res.send(response);
    }

    deleteUser = async (req, res, next) => {
        const response = await userRepository.deleteUser(parseInt(req.params.id, 10)); 
        res.send(response);
    }
}

export default new UserController();
