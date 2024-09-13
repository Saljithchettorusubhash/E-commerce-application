// middleware/validators/addressValidator.middleware.js
import { body, param } from "express-validator";
import prisma from "../../db/prismaClient.js"; // Ensure correct import path for prisma

// Validation schema for address
export const addressValidationSchema = [
    body('unit_number')
        .optional()
        .isString()
        .withMessage('Unit number must be a string'),
    body('street_number')
        .optional()
        .isString()
        .withMessage('Street number must be a string'),
        body('address_line1')  
        .exists()
        .isString()
        .withMessage('Address line 1 is required'),
        body('address_line2')  
        .optional()
        .isString()
        .withMessage('Address line 2 must be a string'),
    body('city')
        .exists()
        .isString()
        .withMessage('City is required'),
    body('region')
        .exists()
        .isString()
        .withMessage('Region is required'),
    body('postal_code')
        .exists()
        .isString()
        .withMessage('Postal code is required'),
        body('country_id') // Expect country_id here
        .exists()
        .isInt()
        .withMessage('Country ID is required')
        .custom(async (value) => {
            const countryExists = await prisma.country.findUnique({
                where: { id: value } // Use ID for lookup
            });
            if (!countryExists) {
                throw new Error('Invalid country ID');
            }
            return true;
        }),
    body('is_default').optional().isBoolean().withMessage('Is default must be a boolean'),
];

export const addressIdValidation = [
    param('id').isInt().withMessage('Address id must be an integer'),
];

;
