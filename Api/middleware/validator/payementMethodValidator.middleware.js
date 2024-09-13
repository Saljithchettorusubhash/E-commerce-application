// middleware/validator/payementMethodValidator.middleware.js

import { body, param } from 'express-validator';

export const paymentMethodValidationSchema = [
    body('provider').exists().isString().withMessage('Provider is required'),
    body('account_number').exists().isString().withMessage('Account number is required'),
    body('expiry_date').exists().isISO8601().withMessage('Expiry date is required'),
    body('paymentTypeId').exists().isInt().withMessage('Payment type is required'),
    body('is_default').optional().isBoolean().withMessage('Is default must be a boolean'),
  ];
  
export const paymentMethodIdValidation = [
  param('id').isInt().withMessage('Payment method ID must be an integer')
];

export const transactionValidationSchema = [
    body('orderId')
    .exists()
    .isInt()
    .withMessage('Order ID is required'),
    body('amount')
    .exists()
    .isFloat()
    .withMessage('Amount is required'),
    body('status')
    .exists()
    .isString()
    .withMessage('Status is required'),
    body('paymentMethodId')
    .exists()
    .isInt()
    .withMessage('Payment method ID is required'),
]
