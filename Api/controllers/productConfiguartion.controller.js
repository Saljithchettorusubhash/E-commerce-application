import productConfigurationRepository from '../repository/productConfiguration.repository.js'
import { checkValidation } from "../middleware/validation.middleware.js";

class ProductConfigurationController {

    getAllProductConfigurations = async(req,res)=>{
        try{
            checkValidation(req);
            const response =  await productConfigurationRepository.getAllProductConfigurations();
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
        
    }
    getProductConfigurationById = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await productConfigurationRepository.getProductConfigurationById(req.params.productItemId,req.params.variationOptionId);
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

    createProductConfiguration = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await productConfigurationRepository.createProductConfiguration(req.body);
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }
    
    updateProductConfiguration = async(req,res)=>{
        try{
            checkValidation(req);
            const response = await productConfigurationRepository.updateProductConfiguration(req.params.productItemId,req.params.variationOptionId,req.body);
            res.send(response);
        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }

    async deleteProductConfiguration(req,res){
        try{
            checkValidation(req);
            
            const response = await productConfigurationRepository.deleteConfiguration(req.params.productItemId,req.params.variationOptionId);
            res.send(response);

        }
        catch(error){
            res.status(400).json({error:error.message});
        }
    }
    }

        
export default new ProductConfigurationController();