import { body, param } from "express-validator";

export const productCategoryValidationSchema = [
    body("category_name").exists().withMessage("Category name is required").isString(),
    body("parent_category_id").optional().isInt().withMessage("Parent category ID must be an integer"),
  ];
  
export const categoryIdValidation = [
    param('id').isInt().withMessage('Category id must be an integer'),
]
export const subCataegoryIdValidation = [
    param('subCategoryId').isInt().withMessage('Sub Category id must be an integer'),
]
export const parentCategoryIdValidation = [
    param('parentId').isInt().withMessage('Parent Category id must be an integer'),
]

