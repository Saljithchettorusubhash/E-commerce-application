import express from 'express';
import ProductController from '../controllers/product.controller.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import { productIdValidation,productValidationSchema,productItemIdvalidation,productionItemValidationSchema } from '../middleware/validator/productValidator.middleware.js';
import auth from '../middleware/auth.middleware.js';
import productController from '../controllers/product.controller.js';

const router = express.Router();

router.get('/',awaitHandlerFactory(productController.getAllProducts));
router.post('/',auth('ADMIN'),productValidationSchema,awaitHandlerFactory(productController.createProduct));
router.get('/:productId',awaitHandlerFactory(productController.getProductById));
router.patch('/:productId',auth('ADMIN'),productIdValidation,productValidationSchema,awaitHandlerFactory(productController.updateProduct));
router.delete('/:productId',auth('ADMIN'),productIdValidation,awaitHandlerFactory(productController.deleteProduct));

router.get('/:productId/items',productIdValidation,awaitHandlerFactory(productController.getProductById));
router.post('/:productId/items',auth('ADMIN'),productIdValidation,awaitHandlerFactory(productController.createProductItem));
router.patch('/items/:itemId', auth('ADMIN'), productItemIdvalidation, productionItemValidationSchema, awaitHandlerFactory(productController.updateProductItem));
router.delete('/items/:itemId',auth('ADMIN'),productItemIdvalidation,awaitHandlerFactory(productController.deleteProductItem));
export default router; 