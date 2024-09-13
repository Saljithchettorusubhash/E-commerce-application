import { body,param } from "express-validator";

export const variationOptionValidationSchema = [
    body('variationId')
    .isInt()
    .withMessage('Variation ID is required'),
    body('value')
    .isString()
    .withMessage('Value is required')
];

export const variationOptionIdValidation = [
    param('optionId')
    .isInt()
    .withMessage('Option ID must be an integer')
];