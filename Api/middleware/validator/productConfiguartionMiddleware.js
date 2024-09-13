import { body,param } from "express-validator";

export const productConfiguartionValidationSchema = [

    body('productItemId')
    .exists()
    .isInt()
    .withMessage('Product item ID is required'),
    body('variationOptionId')
    .exists()
    .isInt()
    .withMessage('Varation option ID is required'),
];
export const productConfiguartionIdValidation = [
    param('productItemId')
    .isInt()
    .withMessage('productItem ID must be an integer'),
    param('variationOptionId')
    .isInt()
    .withMessage('Varation option ID must be an integer'),
];