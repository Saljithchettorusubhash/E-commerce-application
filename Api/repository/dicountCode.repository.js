import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";
import e from "express";

const prisma = new PrismaClient();

class DiscountCodeRepository {
    async createDiscountCode(data) {
        const newDiscountCode = await prisma.discountCode.create({
            data:{
                code:data.code,
                description:data.description || null,
                discount:data.discount,
                validFrom:new Date(data.validFrom),
                validTo:new Date(data.validTo),
                usageLimit:data.usageLimit || null,

            }
        });
        return structureResponse(newDiscountCode,1,"Discount code created successfully"); 
    }

    async getDiscountCodeById(id) {
        const discountCode =await prisma.discountCode.findUnique({
            where:{id:parseInt(id,10)}
        
        });
        if(!discountCode) {
            return structureResponse({},0,"Discount code not found");
        }
        return structureResponse(discountCode,1,"Discount code fetched successfully");
    }


    async updateDiscountCode(id,data) {
        const discountCode = await prisma.discountCode.findUnique({
            where:{id:parseInt(id,10)}
        
        });
        if(!discountCode) {
            return structureResponse({},0,"Discount code not found");
        }
        const updatedDiscountCode = await prisma.discountCode.update({
            where:{id:parseInt(id,10)},
            data:{
                code:data.code,
                description:data.description || null,
                discount:data.discount,
                validFrom:new Date(data.validFrom),
                validTo:new Date(data.validTo),
                usageLimit:data.usageLimit || null,
            }
        });
        return structureResponse(updatedDiscountCode,1,"Discount code updated successfully");
    }
    async deleteDiscountCode(id) {
        const discountCode = await prisma.discountCode.findUnique({
            where:{id:parseInt(id,10)}
        });
        if(!discountCode) {
            return structureResponse({},0,"Discount code not found");
        }
        await prisma.discountCode.delete({
            where:{id:parseInt(id,10)}
        });
        return structureResponse({},1,"Discount code deleted successfully");
    }

    async getAllDiscountCodes() {
        const discountCodes = await prisma.discountCode.findMany();
        return structureResponse(discountCodes,1,"Discount codes fetched successfully");
    }

    async validateDiscountCode(code) {
        const discountCode = await prisma.discountCode.findUnique({
            where:{code:code}
        });
        if(!discountCode) {
            return structureResponse({},0,"Invalid discount code");
        }
        const now = new Date();

        if(discountCode.validFrom > now || discountCode.validTo < now) {
            return structureResponse({},0,"Discount code is not valid");
        }
        if(discountCode.usageLimit && discountCode.usedCount >= discountCode.usageLimit) {
            return structureResponse({},0,"Discount code has reached its usage limit");
        }
        return structureResponse(discountCode,1,"Discount code is valid");
    }

}
export default new DiscountCodeRepository();