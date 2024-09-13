import express from 'express';
import ShoppingCartController from '../controllers/ShoppingCart.controller.js';
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import auth from '../middleware/auth.middleware.js';
import { shoppingCartIdValidation,shoppingCartValidationSchema, userIdValidation } from '../middleware/validator/ShoppingCartValidator.middleware.js';

const router = express.Router();
router.get('/:userId',userIdValidation,awaitHandlerFactory(ShoppingCartController.getCartByUserId));
router.post('/:userId/items',auth('USER'),userIdValidation,shoppingCartValidationSchema,awaitHandlerFactory(ShoppingCartController.addItemtoCart));
router.patch('/:userId/items/:itemId',auth('USER'),userIdValidation,shoppingCartIdValidation,shoppingCartValidationSchema,awaitHandlerFactory(ShoppingCartController.updateCartItem));
router.delete('/:userId/items/:itemId', auth('USER'), userIdValidation, shoppingCartIdValidation, awaitHandlerFactory(ShoppingCartController.deleteCartItem));
router.delete('/:userId',auth('USER'),userIdValidation,awaitHandlerFactory(ShoppingCartController.deleteCart));


export default router; 