import express from 'express';
import productConfiguartionController from '../controllers/productConfiguartion.controller.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import auth from '../middleware/auth.middleware.js';
import { productConfiguartionIdValidation,productConfiguartionValidationSchema } from '../middleware/validator/productConfiguartionMiddleware.js';

const router = express.Router();

router.get('/',auth('ADMIN'),awaitHandlerFactory(productConfiguartionController.getAllProductConfigurations));
router.post('/',auth('ADMIN'),productConfiguartionValidationSchema,awaitHandlerFactory(productConfiguartionController.createProductConfiguration));
router.get('/:productItemId/:variationOptionId',auth('ADMIN'),productConfiguartionIdValidation,awaitHandlerFactory(productConfiguartionController.getProductConfigurationById));
router.patch('/:productItemId/:variationOptionId',auth('ADMIN'),productConfiguartionIdValidation,productConfiguartionValidationSchema,awaitHandlerFactory(productConfiguartionController.updateProductConfiguration));
router.delete('/:productItemId/:variationOptionId',auth('ADMIN'),productConfiguartionIdValidation,awaitHandlerFactory(productConfiguartionController.deleteProductConfiguration));

export default router;
 