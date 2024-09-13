import addressRepository from "../repository/address.repository.js";
import { checkValidation } from "../middleware/validation.middleware.js";

class AddressController {
    getAllAddress = async(req, res) =>{
        checkValidation(req);
        const userId = req.currentUser.id; // Assuming user ID is set in req.currentUser
        const response = await addressRepository.getAllAddresses(userId);
        res.send(response);
    }
    
getSingleAddress = async (req, res) => {
    try {
        checkValidation(req);
        const userId = req.currentUser.id;
        const response = await addressRepository.getSingleAddress(userId, req.params.id);
        res.send(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

    createAddress = async(req, res) => {
        checkValidation(req);
        const userId = req.currentUser.id;
        const response = await addressRepository.createAddress(userId, req.body);
        res.send(response);
    }
    
    updateAddress = async (req, res) => {
        checkValidation(req);
        const userId = req.currentUser.id;
        const response = await addressRepository.updateAddrress(req.params.id, userId, req.body);
        res.send(response);
    }
    
    
    deleteAddress = async(req, res) => {
        checkValidation(req);
        const userId = req.currentUser.id;
        const response = await addressRepository.deleteAddress(req.params.id, userId);
        res.send(response);
    }
}

export default new AddressController();
