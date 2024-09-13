import express from 'express';
import ShippingMethodController from '../controllers/ShippingMethod.controller.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import { shippingMethodIdValidation } from '../middleware/validator/shippingMethodValidator.middleware.js';

const router = express.Router();
router.get('/',awaitHandlerFactory(ShippingMethodController.getAllShippingMethods));
router.get('/:shippingMethodId',shippingMethodIdValidation,awaitHandlerFactory(ShippingMethodController.getShippingMethodById));

export default router;
