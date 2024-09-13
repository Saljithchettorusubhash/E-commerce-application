import { checkValidation } from "../middleware/validation.middleware.js";
import authRepository from "../repository/auth.repository.js";

class AuthController {
    async registerUser(req,res,next) {
        checkValidation(req);
        const response = await authRepository.registerUser(req.body);
        res.send(response);
    }
    
    async userLogin(req,res,next) {
        checkValidation(req)
        const response = await authRepository.userLogin(req.body.email_address,req.body.password);
        res.send(response);
    }

    async refreshToken(req,res,next) {
        checkValidation(req);
        const response = await authRepository.refreshToken(req.body);
        res.send(response);
    }


    async forgotPassword(req,res,next) {
        checkValidation(req);
        const response = await authRepository.forgotPassword(req.body);
        res.send(response);
    }

async verifyOTP (req,res,next) {
    checkValidation(req);
    const response = await authRepository.verifyOTP(req.body);
    res.send(response);

}
async changePassword(req,res,next) {
    checkValidation(req);
    const response = await authRepository.changePassword(req.body);
    res.send(response);
}
async resetPassword(req,res,next) {
    checkValidation(req);
    const response = await authRepository.resetPassword(req.body);
    res.send(response);
}

}
export default new AuthController();