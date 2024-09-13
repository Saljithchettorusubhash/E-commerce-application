import express from 'express'
import userController from '../controllers/user.controller.js'
import awaitHandlerFactory from '../middleware/awaitHandlerFactory.middleware.js'
import { createUserSchema,updateSchema } from '../middleware/validator/userValidator.middleware.js';
import auth from '../middleware/auth.middleware.js';
import { UserRole } from '../utils/enums/userRoles.utils.js';
const router = express.Router()

router.get('/',auth(),awaitHandlerFactory(userController.getAllUsers))
router.get ('/:id',auth(),awaitHandlerFactory(userController.getUserById));
router.post('/',createUserSchema,awaitHandlerFactory(userController.createUser))
router.patch('/:id',auth(UserRole.ADMIN),updateSchema,awaitHandlerFactory(userController.updateUser));
router.delete('/:id',auth(UserRole.ADMIN),awaitHandlerFactory(userController.deleteUser))


export default router
