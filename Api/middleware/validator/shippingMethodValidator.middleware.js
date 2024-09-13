import { param } from "express-validator";
export const shippingMethodIdValidation = [
    param('shippingMethodId')
    .isInt()
    .withMessage('Shipping method ID must be an integer')
];