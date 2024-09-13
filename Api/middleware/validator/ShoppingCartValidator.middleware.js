import { body,param } from "express-validator";

export const shoppingCartValidationSchema = [
    body("productItemId").isInt().withMessage("Product item ID must be an integer"),
    body("qty").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  ];
  
  export const shoppingCartIdValidation = [
    param("itemId").isInt().withMessage("Cart item ID must be an integer"),
  ];
  
  export const userIdValidation = [
    param("userId").isInt().withMessage("User ID must be an integer"),
  ];