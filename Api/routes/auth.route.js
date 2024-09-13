import express from 'express'
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js';
import {createUserSchema,updateSchema} from '../middleware/validator/userValidator.middleware.js'
import {validateLogin,forgotPWSchema,resetPWSchema,changePWSchema,verifyOTPSchema,validateRefresh} from '../middleware/validator/authValidator.middleware.js'
import authController from '../controllers/auth.controller.js';
import authRepository from '../repository/auth.repository.js';

const router = express.Router()

router.post('/register',createUserSchema,awaitHandlerFactory(authController.registerUser));
router.post('/login',validateLogin,awaitHandlerFactory(authController.userLogin));
router.post('/refresh-token',validateRefresh,awaitHandlerFactory(authController.refreshToken));
router.post('/forgot-password',forgotPWSchema,awaitHandlerFactory(authController.forgotPassword));
router.post('/verify-otp',verifyOTPSchema,awaitHandlerFactory(authController.verifyOTP));
router.post('/reset-password',resetPWSchema,awaitHandlerFactory(authController.resetPassword));
router.post('/change-password',changePWSchema,awaitHandlerFactory(authController.changePassword))


export default router