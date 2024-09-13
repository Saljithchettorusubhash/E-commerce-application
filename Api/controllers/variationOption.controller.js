import variationOptionsRepository from "../repository/variationOptions.repository.js";
import { checkValidation } from "../middleware/validation.middleware.js";
import e from "express";

class VariationOptionController {
    getAllVariationOptions = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await variationOptionsRepository.getAllVariationOptions();
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

    getVariationOptionById =async(req,res)=>{
        try{
            checkValidation(req);
            const response = await variationOptionsRepository.getVariationOptionById(req.params.optionId);
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

createVariationOption = async(req,res)=>{
    try{
        checkValidation(req);
        const response = await variationOptionsRepository.createVariationOption(req.body);
        res.send(response);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}


updateVariationOption = async(req,res)=>{
    try{
        checkValidation(req);
        const response = await variationOptionsRepository.updateVariationOption(req.params.optionId,req.body);
        res.send(response);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}

deleteVariationOption = async(req,res)=>{
    try{
        checkValidation(req);
        const response = await variationOptionsRepository.deleteVariationOption(req.params.optionId);
        res.send(response);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}
}
export default new VariationOptionController();