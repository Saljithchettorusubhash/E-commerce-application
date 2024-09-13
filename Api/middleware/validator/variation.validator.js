import { body,param } from "express-validator";

export const variationValidationSchema = [
    body('name')
    .isString()
    .withMessage('Variation name is required'),
    body('categoryId')
    .isInt()
    .withMessage('Category ID is required')
];

export const variationIdValidation = [
    param('variationId')
    .isInt()
    .withMessage('Variation id must be an integer')
];
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