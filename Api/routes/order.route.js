import express from 'express'
import orderController from '../controllers/order.controller.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import auth from '../middleware/auth.middleware.js';
import { orderIdValidation,orderStatusValiadation,orderValidationSchema } from '../middleware/validator/orderValidator.middleware.js';
const router = express.Router();

router.post('/',auth('USER'),orderValidationSchema,awaitHandlerFactory(orderController.createOrder));
router.get('/',auth('USER'),awaitHandlerFactory(orderController.getAllOrdersForUser));
router.get('/:orderId',auth('USER'),orderIdValidation,awaitHandlerFactory(orderController.getOrderById));
router.patch('/:orderId/status',auth('ADMIN'),orderIdValidation,orderStatusValiadation,awaitHandlerFactory(orderController.updateOrderstatus));
router.patch('/:orderId/cancel',auth('USER'),orderIdValidation,awaitHandlerFactory(orderController.cancelOrder));
router.patch('/:orderId/return',auth('USER'),orderIdValidation,awaitHandlerFactory(orderController.returnOrder));


export default router;
