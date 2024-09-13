import express from 'express'
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js'
import {productCategoryValidationSchema,categoryIdValidation,subCataegoryIdValidation, parentCategoryIdValidation,} from '../middleware/validator/productCategfory.validator.js'
import auth from '../middleware/auth.middleware.js'
import productCategoryController from '../controllers/productCategory.controller.js'
const router = express.Router()


router.get('/',awaitHandlerFactory(productCategoryController.getAllProductCategories));
router.get('/:id',auth('ADMIN'),categoryIdValidation,awaitHandlerFactory(productCategoryController.getSingleProductCategory));
router.post('/',auth('ADMIN'),productCategoryValidationSchema,awaitHandlerFactory(productCategoryController.createProductCategory));
router.patch('/:id',auth('ADMIN'),categoryIdValidation,productCategoryValidationSchema,awaitHandlerFactory(productCategoryController.updateProductCategory));
router.delete('/:id',auth('ADMIN'),awaitHandlerFactory(productCategoryController.deleteProductCategory));

router.get("/:parentId/subcategories",  parentCategoryIdValidation, awaitHandlerFactory(productCategoryController.getSubCategory));
router.post('/:parentId/subcategories',auth('ADMIN'),parentCategoryIdValidation,productCategoryValidationSchema,awaitHandlerFactory(productCategoryController.createSubCategory));
router.patch('/subcategories/:subCategoryId',auth('ADMIN'),subCataegoryIdValidation,productCategoryValidationSchema,awaitHandlerFactory(productCategoryController.updateSubCategory));
router.delete('/subcategories/:subCategoryId',auth('ADMIN'),subCataegoryIdValidation,awaitHandlerFactory(productCategoryController.deleteSubCategory));

export default router