import ProductCategoryRepository from "../repository/ProductCategory.repository.js";
import { checkValidation } from "../middleware/validation.middleware.js";

class ProductCategoryController {
  getAllProductCategories = async (req, res) => {
    try {
      checkValidation(req);
      const response =
        await ProductCategoryRepository.getAllProductCategories();
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  getSingleProductCategory = async (req, res) => {
    try {
      checkValidation(req);
      const response = await ProductCategoryRepository.getProductCategory(
        req.params.id
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  createProductCategory = async (req, res) => {
    try {
      checkValidation(req);
      const response = await ProductCategoryRepository.createProductCategory(
        req.body
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateProductCategory = async (req, res) => {
    try {
      checkValidation(req);
      const response = await ProductCategoryRepository.updateProductCategory(
        req.params.id,
        req.body
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  deleteProductCategory = async (req, res) => {
    try {
      checkValidation(req);
      const response = await ProductCategoryRepository.deleteProductCategory(
        req.params.id
      );
      res.send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
    getSubCategory = async (req, res) => {
      try {
        checkValidation(req);
        const response = await ProductCategoryRepository.getSubCategories(
          req.params.parentId
        );
        res.send(response);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
    
    createSubCategory = async (req, res) => {
      try {
        checkValidation(req);
        const response = await ProductCategoryRepository.createSubCategory(
          req.params.parentId,
          req.body
        );
        res.send(response);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };

    updateSubCategory = async (req, res) => {
      try {
        checkValidation(req);
        const response = await ProductCategoryRepository.updateSubCategory(
          req.params.subCategoryId,
          req.body
        );
        res.send(response);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
    deleteSubCategory = async (req, res) => {
      try {
        checkValidation(req);
        const response = await ProductCategoryRepository.deleteSubCategory(
          req.params.subCategoryId
        );
        res.send(response);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
  
}
export default new ProductCategoryController();
