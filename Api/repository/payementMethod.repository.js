import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";

const prisma = new PrismaClient();

class PaymentMethodRepository {
  async getAllPaymentMethods(userId) {
    const paymentMethods = await prisma.userPaymentMethod.findMany({
      where: { userId },
      include: {
        paymentType: true,
        paymentTransactions: true
      }
    });
    return structureResponse(paymentMethods, 1, "Payment methods fetched successfully");
  }

  async createPaymentMethod(userId, paymentData) {
    const newPaymentMethod = await prisma.userPaymentMethod.create({
      data: {
        ...paymentData,
        userId
      }
    });
    return structureResponse(newPaymentMethod, 1, "Payment method created successfully");
  }

  async updatePaymentMethod(paymentMethodId, userId, paymentData) {
    const paymentmentMethodIdInt = parseInt(paymentMethodId, 10);
    const paymentMethod = await prisma.userPaymentMethod.findFirst({
      where: { id: paymentmentMethodIdInt, userId }
    });
    if (!paymentMethod) {
      return structureResponse({}, 0, "Payment method not found");
    }
    const updatedPaymentMethod = await prisma.userPaymentMethod.update({
      where: { id: paymentmentMethodIdInt },
      data: { ...paymentData }
    });
    return structureResponse(updatedPaymentMethod, 1, "Payment method updated successfully");
  }

  async deletePaymentMethod(paymentMethodId, userId) {
    const paymentMethodIdInt = parseInt(paymentMethodId, 10);
    const paymentMethod = await prisma.userPaymentMethod.findFirst({
      where: { id: paymentMethodIdInt, userId }
    });
    if (!paymentMethod) {
      return structureResponse({}, 0, "Payment method not found");
    }
    await prisma.userPaymentMethod.delete({
      where: { id: paymentMethodIdInt }
    });
    return structureResponse({}, 1, "Payment method deleted successfully");
  }
   async getAllPayementTypes () {
    const paymentTypes = await prisma.paymentType.findMany();
    return structureResponse(paymentTypes, 1, "Payment types fetched successfully");
   }

  async getAllTransactions(userId) {
    const transactions = prisma.paymentTransaction.findMany({
        where:{
            paymentMethod:{
                userId
            }
        },
        include:{
            order:true,
            paymentMethod:true
        }

    })
    return structureResponse(transactions, 1, "Transactions fetched successfully");
  }

  

async createTransaction(transactionData) {
    const {orderId,paymentMethodId} = transactionData

    const order = await prisma.shopOrder.findUnique({
        where: { id: orderId },
      });
  
      if (!order) {
        throw new Error('Invalid orderId');
      }
   const paymentMethod = await prisma.userPaymentMethod.findUnique({
    where:{id:paymentMethodId}
   });
    if(!paymentMethod){
        throw new Error('Invalid paymentMethodId');
    }
    const newTransactionData = await prisma.paymentTransaction.create({
        data:transactionData
    });
    return structureResponse(newTransactionData,1,'Transaction created successfully');

    }


}

export default new PaymentMethodRepository();
