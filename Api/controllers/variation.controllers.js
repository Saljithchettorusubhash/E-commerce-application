import variationRepository from "../repository/variation.repository.js";
import { checkValidation } from "../middleware/validation.middleware.js";

class VariationController {
    getAllvariations = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await variationRepository.getAllVariations();
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }

    }
    getVariationById = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await variationRepository.getVariationById(req.params.variationId);
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }
        createVariation = async(req,res)=>{
            try{
                checkValidation(req);
                const response = await variationRepository.createVariation(req.body);
                res.send(response);
            }
            catch(error){
                res.status(400).json({error:error.message});
            }
        }
    

        updatedVariation = async(req,res)=>{
            try{
                checkValidation(req);
                
                const response = await variationRepository.updateVariation(req.params.variationId,req.body);
                res.send(response);
            }
            catch(error){
                res.status(400).json({error:error.message});
            }
        }
    

    deleteVariation = async(req,res)=>{
        try{
            checkValidation(req);
            
            const response = await variationRepository.deleteVariation(req.params.variationId);
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
    }
    }


}
export default new VariationController