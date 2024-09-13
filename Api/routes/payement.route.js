import express from 'express';
import PaymentMethodController from '../controllers/payementMethod.controller.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import auth from '../middleware/auth.middleware.js';
import convertExpiryToDateTime from '../middleware/convertExpiry.middleware.js';
import { paymentMethodValidationSchema, paymentMethodIdValidation, transactionValidationSchema } from '../middleware/validator/payementMethodValidator.middleware.js';
import payementMethodController from '../controllers/payementMethod.controller.js';

const router = express.Router();
router.get('/methods',auth(), awaitHandlerFactory(PaymentMethodController.getAllPayementMethods));
router.post('/methods', auth(),convertExpiryToDateTime, paymentMethodValidationSchema, awaitHandlerFactory(PaymentMethodController.createPayementMethod));
router.patch('/methods/:id',auth(),convertExpiryToDateTime,paymentMethodIdValidation,paymentMethodValidationSchema,awaitHandlerFactory(payementMethodController.updatePayementMethod));
router.delete('/methods/:id',auth(),paymentMethodIdValidation,awaitHandlerFactory(payementMethodController.deletePayementMethod));
router.get('/types',auth(), awaitHandlerFactory(PaymentMethodController.getAllPayementTypes));
router.get('/transaction',auth(),awaitHandlerFactory(payementMethodController.getAllTransactions));
router.post('/transaction',auth(),transactionValidationSchema,awaitHandlerFactory(payementMethodController.createTransaction))
export default router;