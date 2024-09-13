import { body, param } from 'express-validator';

export const discountCodeValidationSchema = [
  body('code').isString().withMessage('Code must be a string'),
  body('discount').isFloat({ min: 0, max: 1 }).withMessage('Discount must be a float between 0 and 1'),
  body('validFrom').isISO8601().withMessage('Valid from must be a date'),
  body('validTo').isISO8601().withMessage('Valid to must be a date'),
  body('usageLimit').optional().isInt({ min: 1 }).withMessage('Usage limit must be an integer'),
  body('description').optional().isString().withMessage('Description must be a string')
];

export const discountCodeIdValidation = [
  param('id').isInt().withMessage('Discount code ID must be an integer')
];

export const discountCodeValidation = [
  param('code').isString().withMessage('Discount code must be a string')
];
