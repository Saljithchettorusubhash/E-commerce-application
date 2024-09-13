import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";

const prisma = new PrismaClient();

class ProductRepository {
    async getAllProducts () {
        const products = await prisma.product.findMany({
            include:{
                productItems:true,
                category:true,
            }
        })
        return structureResponse(products, 1, "Products fetched successfully");

    }
    async getProductById (productId) {
        
        const product = await prisma.product.findUnique({
            where:{id:parseInt(productId,10)},
            include:{
                productItems:true,
                category:true
            }
        });
        if(!product){
            return structureResponse({}, 0, "Product not found");
        }
        return structureResponse(product, 1, "Product fetched successfully");
    }
    async createProduct (productData) {
        const newProduct = await prisma.product.create({
            data:{
                name:productData.name,
                description:productData.description,
                product_image:productData.product_image,
                categoryId:productData.categoryId,
            }
        });
        return structureResponse(newProduct, 1, "Product created successfully");

    }
    async updateProduct (productId,productData) {
        try{
        const product = await prisma.product.findUnique({
            where:{id:parseInt(productId,10)}
        });
        if(!product){
            return structureResponse({}, 0, "Product not found");
        }
        const updatedProduct = await prisma.product.update({
            where:{id:parseInt(productId,10)},
            data:productData
        });
        return structureResponse(updatedProduct, 1, "Product updated successfully");
    }
    catch(error){
        return structureResponse({}, 0, "Product not found",error);
    }
}


    async deleteProduct (productId) {
        const product = await prisma.product.findUnique({
            where:{id:parseInt(productId,10)}
        });
        if(!product){
            return structureResponse({}, 0, "Product not found");
        }
        await prisma.product.delete({
            where:{id:parseInt(productId,10)}
        });
        return structureResponse({}, 1, "Product deleted successfully");
    }

    async getproductItem(productId) {
        const productItems = await prisma.productItem.findMany({
          where: { productId: parseInt(productId, 10) }
        });
        return structureResponse(productItems, 1, "Product items fetched successfully");
      }
      



    async createProductItem(productId,itemData) {


        try{


            const productExists = await prisma.product.findUnique({
                where: { id: parseInt(productId, 10) },
              });
          
              if (!productExists) {
                return structureResponse({}, 0, "Product not found");
              }
          
        const newData = await prisma.productItem.create({
            data:{
                productId:parseInt(productId,10),
                SKU:itemData.SKU,
                qty_in_stock:itemData.qty_in_stock,
                product_image:itemData.product_image,
                price:itemData.price

            }
        });
        return structureResponse(newData, 1, "Product item created successfully");
    }
     catch(error){
        return structureResponse({}, 0, "Product not found",error);

    }
}

async updateProductItem (itemId, itemData) {
    const productItem = await prisma.productItem.findUnique({
        where: { id: parseInt(itemId, 10) }
    });
    if (!productItem) {
        return structureResponse({}, 0, "Product item not found");
    }
    const updatedItem = await prisma.productItem.update({
        where: { id: parseInt(itemId, 10) },
        data: itemData
    });
    return structureResponse(updatedItem, 1, "Product item updated successfully");
}


    async deleteProductItem (itemId) {
        try{
        const productItem = await prisma.productItem.findUnique({
            where:{id:parseInt(itemId,10)}
        });
        if (!productItem) {
            return structureResponse({}, 0, "Product item not found");
        }
        await prisma.productItem.delete({
            where:{id:parseInt(itemId,10)}
        });
        
        return structureResponse({}, 1, "Product item deleted successfully");
        }
        catch(error){
            return structureResponse({}, 0, "Product item not found");
        }
    
    }


}
export default new ProductRepository();