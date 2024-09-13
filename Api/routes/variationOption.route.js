import express from 'express';
import variationOptionController from '../controllers/variationOption.controller.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import { variationOptionIdValidation,variationOptionValidationSchema } from '../middleware/validator/variationOption.middleware.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/',awaitHandlerFactory(variationOptionController.getAllVariationOptions));
router.post('/',auth('ADMIN'),variationOptionValidationSchema,awaitHandlerFactory(variationOptionController.createVariationOption));
router.get('/:optionId',variationOptionIdValidation,awaitHandlerFactory(variationOptionController.getVariationOptionById));
router.patch('/:optionId',auth('ADMIN'),variationOptionIdValidation,variationOptionValidationSchema,awaitHandlerFactory(variationOptionController.updateVariationOption));
router.delete('/:optionId',auth('ADMIN'),variationOptionIdValidation,awaitHandlerFactory(variationOptionController.deleteVariationOption));

export default router;