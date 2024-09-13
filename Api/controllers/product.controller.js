import { checkValidation } from "../middleware/validation.middleware.js";
import productRepository from "../repository/product.repositoey.js";

class ProductController {

  getAllProducts = async (req, res) => {
    try {
      checkValidation(req);
      const response = await productRepository.getAllProducts();
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  getProductById = async (req, res) => {
    try {
      checkValidation(req);
      const response = await productRepository.getProductById(req.params.productId);
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  createProduct = async (req, res) => {
    try {
      checkValidation(req);
      const response = await productRepository.createProduct(req.body);
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  updateProduct = async (req, res) => {
    try {
      checkValidation(req);
      const response = await productRepository.updateProduct(
        req.params.productId,
        req.body
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



  deleteProduct = async (req, res) => {
    try {
      checkValidation(req);
      const response = await productRepository.deleteProduct(req.params.productId);
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

}



getProductItem = async (req, res) => {
    try {
        checkValidation(req);
        const response = await productRepository.getProductItem(req.params.productId);
        res.send(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



  createProductItem = async (req, res) => {
    try {
      checkValidation(req);
      const response = await productRepository.createProductItem(
        req.params.productId,
        req.body
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



  updateProductItem = async (req, res) => {
    try {
        checkValidation(req);
        const response = await productRepository.updateProductItem(req.params.itemId, req.body);
        res.send(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


deleteProductItem = async(req,res)=>{
    try{
        checkValidation(req);
        const response = await productRepository.deleteProductItem(req.params.itemId);
        res.send(response)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }

}

}


export default new ProductController();
