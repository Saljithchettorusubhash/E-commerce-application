import { param,body } from "express-validator";

export const createOrderStatusHistoryValidation =[
    body('orderId')
    .exists()
    .withMessage('Order ID is required')
    .isInt()
    .withMessage('Order ID must be an integer'),

    body('newStatusId')
    .exists()
    .withMessage('New status ID is required')
    .isInt()
    .withMessage('New status ID must be an integer'),
    body('userId')
    .optional()
    .isInt()
    .withMessage('User ID must be an integer'),
    body('reason')
    .optional()
    .isString()
    .withMessage('Reason must be a string'),
    body('automated')
    .optional()
    .isBoolean()
    .withMessage('Automated must be a boolean')
];


export const orderStatusHistoryIdValidation =[
    param('orderId')
    .isInt()
    .withMessage('Order ID must be an integer')
];
