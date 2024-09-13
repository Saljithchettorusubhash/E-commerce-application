import { body, param } from "express-validator";

export const productValidationSchema = [
  body("name").isString().withMessage("product name is required"),
  body("description")
    .exists()
    .isString()
    .withMessage("product description is required"),
  body("product_image")
    .exists()
    .isString()
    .withMessage("product image is required"),
  body("categoryId").exists().isInt().withMessage("category ID is required"),
];



export const productionItemValidationSchema = [
  body("SKU").exists().isString().withMessage("SKU is required"),

  body("qty_in_stock")
    .exists()
    .isInt()
    .withMessage("quantity in stock is required"),
  body("product_image")
    .exists()
    .isString()
    .withMessage("product image is required"),
  body("price").exists().isFloat().withMessage("price is required"),
];
export const productItemIdvalidation = [
  param("itemId").isInt().withMessage("Product item id must be an integer"),
];

export const productIdValidation = [
    param("productId").isInt().withMessage("Product id must be an integer"),
  ];
  
