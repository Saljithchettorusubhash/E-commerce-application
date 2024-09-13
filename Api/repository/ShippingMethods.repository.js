import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";

const prisma = new PrismaClient();
class ShippingMethodRepository {
    async getAllShippingMethods() {
        const shippingMethods = await prisma.shippingMethod.findMany();
        return structureResponse(shippingMethods, 1, "Shipping methods fetched successfully");
    }


    async getShippingMethodById(shippingMethodId) {
        const shippingMethod = await prisma.shippingMethod.findUnique({
            where:{id:shippingMethodId}
        })
        if(!shippingMethod){
            return structureResponse({},0,"Shipping method not found")
        }
        return structureResponse(shippingMethod,1,"Shipping method fetched successfully")
    }

}
export default new ShippingMethodRepository();
