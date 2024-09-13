import express from 'express';
import addressController from '../controllers/address.controller.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import auth from '../middleware/auth.middleware.js';
import { addressValidationSchema, addressIdValidation }  from '../middleware/validator/addressValidator.middleware.js'

const router = express.Router();
router.get('/', auth(), awaitHandlerFactory(addressController.getAllAddress));
router.get('/:id', auth(), addressIdValidation, awaitHandlerFactory(addressController.getSingleAddress));
router.post('/', auth(), addressValidationSchema, awaitHandlerFactory(addressController.createAddress));
router.patch('/:id',auth(),addressIdValidation,addressValidationSchema,awaitHandlerFactory(addressController.updateAddress));
router.delete('/:id',auth(),addressIdValidation,awaitHandlerFactory(addressController.deleteAddress));

export default router;