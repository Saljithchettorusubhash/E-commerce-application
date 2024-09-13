import {body,param} from 'express-validator';

export const orderValidationSchema =[
    body('paymentMethodId')
    .exists()
    .isInt()
    .withMessage('Payment method ID is required'),
    body('shippingAddressId')
    .exists()
    .isInt()
    .withMessage('Shipping address ID is required'),
    body('discoutCodeId')
    .optional()
    .isInt()
    .withMessage('Discount code ID must be an integer'),

];

export const orderIdValidation= [
    param('orderId')
    .isInt()
    .withMessage('Order ID must be an integer')

];
export const orderStatusValiadation =[
    body('statusId')
    .isInt()
    .withMessage('Status ID must be an integer')
];

