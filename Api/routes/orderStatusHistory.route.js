import express from 'express';
import orderStatusGistoryController from '../controllers/orderStatusGistory.controller.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import { orderStatusHistoryIdValidation,createOrderStatusHistoryValidation } from '../middleware/validator/orderStatusHistoryValidator.middleware.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/:orderId/history',auth('USER'),orderStatusHistoryIdValidation,awaitHandlerFactory(orderStatusGistoryController.getOrderStatusHistory));
router.get('/status', auth('USER'), awaitHandlerFactory(orderStatusGistoryController.getOrderStatusHistoryByStatus));
router.post(
    '/create',
    auth('ADMIN'), 
    createOrderStatusHistoryValidation,
    awaitHandlerFactory(orderStatusGistoryController.createOrderStatusHistory)
  );

export default router;
