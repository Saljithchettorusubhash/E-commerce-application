import express from 'express'
import discouNtCodeController from '../controllers/discountCode.controller.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import auth from '../middleware/auth.middleware.js';
import { discountCodeIdValidation,discountCodeValidation,discountCodeValidationSchema } from '../middleware/validator/discountCode.validator.js';
const router = express.Router();

router.get('/validate/:code', discountCodeValidation, awaitHandlerFactory(discouNtCodeController.validateDiscountCode));

router.post('/', auth('ADMIN'), discountCodeValidationSchema, awaitHandlerFactory(discouNtCodeController.createDiscountCode));
router.get('/:id', auth('ADMIN'), discountCodeIdValidation, awaitHandlerFactory(discouNtCodeController.getDiscountCodeById));
router.get('/', auth('ADMIN'), awaitHandlerFactory(discouNtCodeController.getAllDiscountCodes));
router.patch('/:id', auth('ADMIN'), discountCodeIdValidation, discountCodeValidationSchema, awaitHandlerFactory(discouNtCodeController.updateDiscountCode));
router.delete('/:id', auth('ADMIN'), discountCodeIdValidation, awaitHandlerFactory(discouNtCodeController.deleteDiscountCode));

export default router;