import express from 'express';
import variationControllers from '../controllers/variation.controllers.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import auth from '../middleware/auth.middleware.js';
import { variationIdValidation,variationOptionIdValidation,variationOptionValidationSchema,variationValidationSchema } from '../middleware/validator/variation.validator.js';
const router = express.Router();

router.get('/',awaitHandlerFactory(variationControllers.getAllvariations));
router.post('/',auth('ADMIN'), variationValidationSchema,awaitHandlerFactory(variationControllers.createVariation));
router.get('/:variationId',awaitHandlerFactory(variationControllers.getVariationById));
router.patch('/:variationId',auth('ADMIN'),variationIdValidation,variationValidationSchema,awaitHandlerFactory(variationControllers.updatedVariation));
router.delete('/:variationId',auth('ADMIN'),variationIdValidation,awaitHandlerFactory(variationControllers.deleteVariation));
export default router;
