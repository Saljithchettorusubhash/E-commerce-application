import { body } from 'express-validator';
import EmailValidator from 'deep-email-validator';
import { UserRole } from '../../utils/enums/userRoles.utils.js';

export const createUserSchema = [
    body('full_name')
        .trim()
        .exists()
        .withMessage('Full name is required')
        .isLength({ min: 3 })
        .withMessage('Full name must be at least 3 characters long'),
    body('email_address')
        .trim()
        .optional()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            if (email) {
                const { valid } = await EmailValidator.validate(email);
                return valid;
            }
            return true;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('phone_number')
        .trim()
        .optional()
        .isMobilePhone()
        .withMessage('Must be a valid phone number'),
    body('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('role')
        .optional()
        .trim()
        .custom(value => {
            return Object.values(UserRole).includes(value.toUpperCase());
        })
        .withMessage('Invalid UserRole type')
        .toUpperCase(), // Convert role to uppercase for validation
    body().custom(value => {
        if (!value.email_address && !value.phone_number) {
            throw new Error('Either email or phone number is required');
        }
        return true;
    })
];

export const updateSchema = [
    body('full_name')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Full name must be at least 2 characters long'),
    body('email_address')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (email) => {
            const { valid } = await EmailValidator.validate(email);
            return valid;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('phone_number')
        .optional()
        .trim()
        .isMobilePhone('any')
        .withMessage('Must be a valid phone number'),
    body('role')
        .optional()
        .trim()
        .custom(value => {
            return Object.values(UserRole).includes(value.toUpperCase());
        })
        .withMessage('Invalid Role')
        .toUpperCase(), // Convert role to uppercase for validation
    body().custom(value => {
        return Object.keys(value).length !== 0;
    })
    .withMessage('Please provide at least one field to update')
    .custom(value => {
        const updates = Object.keys(value);
        const allowedUpdates = ['full_name', 'email_address', 'phone_number', 'role'];
        return updates.every(update => allowedUpdates.includes(update));
    })
    .withMessage('Invalid updates!')
];