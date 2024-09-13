import ShippingMethodsRepository from "../repository/ShippingMethods.repository.js";
import { checkValidation } from "../middleware/validation.middleware.js";

class ShippingMethodsController {
    getAllShippingMethods = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await ShippingMethodsRepository.getAllShippingMethods();
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }
    getShippingMethodById = async(req,res)=>{
        try{
            checkValidation(req);
            const shippingMethodId = parseInt(req.params.shippingMethodId,10);
            const response = await ShippingMethodsRepository.getShippingMethodById(shippingMethodId);
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }
}
export default new ShippingMethodsController();