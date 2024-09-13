import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";

const prisma = new PrismaClient();
class productCategoryRepository {
    async getAllProductCategories() {
        const categories = await prisma.productCategory.findMany({
            where:{parent_category_id:null},
            include:{
                products:true,
                subCategories:true,
            }
        })
        return structureResponse(categories, 1, "Product categories fetched successfully");
    }

    async getProductCategory(categoryId) {
        const category = await prisma.productCategory.findMany({
            where:{id:parseInt(categoryId,10)},
            include:{
                products:true,
                subCategories:true,
                products:true
            }
        })
        if(!category){
            return structureResponse({}, 0, "Product category not found");
        }
        return structureResponse(category, 1, "Product category fetched successfully");
    }

    async createProductCategory(categoryData) {
        const newCategory = await prisma.productCategory.create({
            data:{
                category_name:categoryData.category_name,
                parent_category_id:categoryData.parent_category_id || null
            }
        });
        return structureResponse(newCategory, 1, "Product category created successfully");
    }

    async updateProductCategory(categoryId,categoryData) {
        const category = await prisma.productCategory.findUnique({
            where:{id:parseInt(categoryId,10)}
        });
        if(!category){
            return structureResponse({}, 0, "Product category not found");
        }

        const updatedCategory = await prisma.productCategory.update({
            where:{id:parseInt(categoryId,10)},
            data:{
                category_name:categoryData.category_name,
                parent_category_id:categoryData.parent_category_id || null
            }
        });
        return structureResponse(updatedCategory, 1, "Product category updated successfully");
            
    }

    async deleteProductCategory(categoryId){
        const category = await prisma.productCategory.findUnique({
            where:{id:parseInt(categoryId,10)}
        });
        if(!category){
            return structureResponse({}, 0, "Product category not found");
        }
        const relatedProducts = await prisma.product.findMany({
            where:{categoryId:parseInt(categoryId,10)}
        })
        
        if(relatedProducts.length > 0) {
            return structureResponse({},0,"Cannot delete category with existing products.");
        }

        await prisma.productCategory.delete({
            where:{id:parseInt(categoryId,10)}
        });
        return structureResponse({}, 1, "Product category deleted successfully");

    }

    async getSubCategories(parentCategoryId){
        const subCategories = await prisma.productCategory.findMany({
            where:{parent_category_id:parseInt(parentCategoryId,10)}
        })
        return structureResponse(subCategories, 1, "Sub categories fetched successfully");

    }

    async createSubCategory(parentCategoryId,subCategoryData){
        const newSubCategory = await prisma.productCategory.create({
            data:subCategoryData

        });
        return structureResponse(newSubCategory, 1, "Sub category created successfully");
    }

    async updateSubCategory(subCategoryId,subCategoryData) {
        const subCataegory =  await prisma.productCategory.findUnique({
            where:{id:parseInt(subCategoryId,10)}
        
        });
        if(!subCataegory){
            return structureResponse({}, 0, "Sub category not found");
        }
        const updatedSubcategory = await prisma.productCategory.update({
            where:{id:parseInt(subCategoryId,10)},
            data:subCategoryData
        });
        return structureResponse(updatedSubcategory, 1, "Sub category updated successfully");

    }

    async deleteSubCategory(subCategoryId){
        const subCategory = await prisma.productCategory.
        findUnique({
            where:{id:parseInt(subCategoryId,10)}
        });
        if(!subCategory){
            return structureResponse({}, 0, "Sub category not found");
        }
        await prisma.productCategory.delete({
            where:{id:parseInt(subCategoryId,10)}
        });
        return structureResponse({}, 1, "Sub category deleted successfully");
    }

}
export default new productCategoryRepository();