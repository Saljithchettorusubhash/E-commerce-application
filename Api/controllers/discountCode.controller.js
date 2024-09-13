import dicountCodeRepository from "../repository/dicountCode.repository.js";
import { checkValidation } from "../middleware/validation.middleware.js";

class discountCodeController {

    createDiscountCode = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await dicountCodeRepository.createDiscountCode(req.body);
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    };

    getDiscountCodeById = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await dicountCodeRepository.getDiscountCodeById(req.params.id);
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

    getAllDiscountCodes = async(req,res)=>{
        try{
            checkValidation(req);
            const response =await dicountCodeRepository.getAllDiscountCodes();
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

    updateDiscountCode = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await dicountCodeRepository.updateDiscountCode(
                req.params.id,
                req.body
            );
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

    deleteDiscountCode = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await dicountCodeRepository.deleteDiscountCode(req.params.id);
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

    validateDiscountCode = async(req,res)=>{
        try {
            checkValidation(req);
            const response = await dicountCodeRepository.validateDiscountCode(req.params.code);
            res.send(response);
          } catch (error) {
            console.error("Validation error:", error.message); // Log any errors
            res.status(400).json({ error: error.message });
          }
    }



}
export default new discountCodeController();