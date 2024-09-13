import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";

const prisma = new PrismaClient();
class orderStatusHistoryRepository {
    async createOrderStatusHistory(orderId,previousStatusId,newStatusId,userId,reason,automated =false) {
        const previousStatus = await prisma.orderStatus.findUnique({
            where:{id:previousStatusId},
            
        });
        const newStatus = await prisma.orderStatus.findUnique({
            where:{id:newStatusId}
        });
        if(!previousStatus || !newStatus){
            return structureResponse({},0,"Order status not found")
        }
        const historyRecord = await prisma.orderStatusHistory.create({
            data:{
                orderId:orderId,
                previousStatus:previousStatus.status,
                newStatus:newStatus.status,
                changedAt:new Date(),
                changedById:userId,
                reason:reason,
                automated:automated
            }
        });
        return structureResponse(historyRecord,1,"order status recorded successfully");


    }
    async getOrderStatusHistory(orderId){
        const historyRecord = await prisma.orderStatusHistory.findMany({
            where:{orderId:parseInt(orderId,10)},
            orderBy:{
                changedAt:"desc"
            }
        });
        if(!historyRecord){
            return structureResponse({},0,"Order status history not found")
        }
        return structureResponse(historyRecord,1,"Order status history fetched successfully");
    }

    async getOrderHistoriesByStatus(statusId, startDate, endDate) {
        const status = await prisma.orderStatus.findUnique({
            where: { id: parseInt(statusId, 10) }
        });
        if (!status) {
            return structureResponse({}, 0, "Order status not found");
        }
    
        const historyRecords = await prisma.orderStatusHistory.findMany({
            where: {
                newStatus: status.status,  // ensure this matches the field name in your schema
                changedAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            },
            orderBy: {
                changedAt: "desc"
            }
        });
    
        if (!historyRecords.length) {
            return structureResponse({}, 0, "No records found for the given status");
        }
    
        return structureResponse(historyRecords, 1, "Order status history fetched successfully");
    }
    

}
export default new orderStatusHistoryRepository();