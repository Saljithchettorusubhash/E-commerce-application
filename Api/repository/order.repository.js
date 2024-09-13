import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";

const prisma = new PrismaClient();

class OrderRepository {
  async createOrder(userId, orderData) {
    const { paymentMethodId, shippingAddressId, discountCodeId , shippingMethodId} = orderData;

    const paymentMethod = await prisma.userPaymentMethod.findUnique({
      where: { id: paymentMethodId },
    });
    if (!paymentMethod) {
      return structureResponse({}, 0, "Payment method not found");
    }
  
      const shippingAddress = await prisma.userAddress.findUnique({
      where: { id: shippingAddressId },
    });
    if (!shippingAddress) {
      return structureResponse({}, 0, "Shipping address not found");
    }


    if (shippingMethodId === undefined) {
      return structureResponse({}, 0, "Shipping method ID is missing");
    }

    const shippingMethod = await prisma.shippingMethod.findUnique({
      where: { id: shippingMethodId },
    
    });
    if (!shippingMethod) {
      return structureResponse({}, 0, "Shipping method not found");
    }


    // Fetch cart items
    const cartItems = await prisma.shoppingCartItem.findMany({
      where: {
        cart: { userId: userId },
      },
      include: {
        productItem: true,
      },
    });
    if (!cartItems.length) {
      return structureResponse({}, 0, "Cart is empty");
    }

    let orderTotal = cartItems.reduce(
      (total, item) => total + item.productItem.price * item.qty,
      0
    );
    orderTotal += shippingMethod.price;


    // Validate and apply discount code
    if (discountCodeId) {
      const discountCode = await prisma.discountCode.findUnique({
        where: { id: discountCodeId },
      });
      const now = new Date();
      if (
        discountCode &&
        discountCode.validFrom <= now &&
        discountCode.validTo >= now
      ) {
        if (
          !discountCode.usageLimit ||
          discountCode.usedCount < discountCode.usageLimit
        ) {
          const discountAmount = orderTotal * discountCode.discount;
          orderTotal -= discountAmount;

          // Increment the used count
          await prisma.discountCode.update({
            where: { id: discountCodeId },
            data: { usedCount: { increment: 1 } },
          });
        }
      }
    }

    // Check product stock
    for (const item of cartItems) {
      if (item.qty > item.productItem.qty_in_stock) {
        return structureResponse({}, 0, "Not enough stock for product: " + item.productItem.name);
      }
    }

    // Create the order and order lines
    const order = await prisma.shopOrder.create({
      data: {
        user: {
          connect: { id: userId }
        },
        paymentMethod:{
          connect:{id:paymentMethodId}
        },
        shippingMethod: {
          connect: { id: shippingMethodId }
        },
        order_status:{
          connect:{id:1}
        },
        order_date: new Date(),
        shipping_address: shippingAddressId,
        order_total: orderTotal,
        discountCodeId: discountCodeId,
        orderLines: {
          create: cartItems.map((item) => ({
            productItemId: item.productItemId,
            qty: item.qty,
            price: item.productItem.price,
          })),
        },
      },
    });

    // Update stock levels
    for (const item of cartItems) {
      await prisma.productItem.update({
        where: { id: item.productItemId },
        data: {
          qty_in_stock: { decrement: item.qty },
        },
      });
    }

    // Clear the shopping cart
    await prisma.shoppingCartItem.deleteMany({
      where: { cart: { userId: userId } },
    });

    return structureResponse(order, 1, "Order created successfully");
  }




  async updateOrderStatus(orderId, statusId,userId) {
    console.log("the orderId and statusId are", orderId, statusId);

    const order = await prisma.shopOrder.findUnique({
      where: { id: parseInt(orderId, 10) },
      include:{order_status:true}
    });
    if (!order) {
      return structureResponse({}, 0, "Order not found");
    }
    const previousState = order.order_status.status;
    console.log("previous state",previousState)
    const newStatus = await prisma.orderStatus.findUnique({
      where:{id:statusId}
    })
    console.log("new status",newStatus)

    if(!newStatus){
      return structureResponse({},0,"New status not found")
    }

    const updatedOrder = await prisma.shopOrder.update({
      where: { id: parseInt(orderId, 10) },
      data: {
        order_status_id: statusId,
      },
    });

    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        previousStatus: order.order_status.status, // Current status name
        newStatus: newStatus.status, // New status name
        changedAt: new Date(),
        changedById: userId, // Assuming you have a userId available
        reason: "Status updated", // You can customize this with any specific reason if needed
        automated: false // Set according to whether this change is system-triggered or manual
      },
    });

    return structureResponse(
      updatedOrder,
      1,
      "Order status updated successfully"
    );
  }

  async getAllOrdersForUser(userId) {
    const orders = await prisma.shopOrder.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderLines: {
          include: {
            productItem: true,
          },
        },
        order_status: true,
      },
    });
    return structureResponse(orders, 1, "Orders fetched successfully");
  }

  async getOrderById(orderId) {
    const order = await prisma.shopOrder.findUnique({
      where: { id: parseInt(orderId, 10) },
      include: {
        orderLines: {
          include: {
            productItem: true,
          },
        },
      },
    });
    if (!order) {
      return structureResponse({}, 0, "Order not found");
    }
    return structureResponse(order, 1, "Order fetched successfully");
  }




  async cancelOrder(orderId, userId) {
    const order = await prisma.shopOrder.findUnique({
      where: { id: parseInt(orderId, 10) },
      include: {
        orderLines: true,
        order_status: true // Include the current status
      },
    });
    console.log("fetched order is ", order);
    console.log("current user id is ", userId);

    if (!order) {
      return structureResponse({}, 0, "Order not found");
    }
    if (order.userId !== userId) {
      return structureResponse({}, 0, "Not authorized to cancel this order");
    }
    if (order.order_status_id >= 3) {
      return structureResponse({}, 0, "Order cannot be canceled");
    }

    // Revert stock levels
    for (const line of order.orderLines) {
      await prisma.productItem.update({
        where: { id: line.productItemId },
        data: {
          qty_in_stock: { increment: line.qty },
        },
      });
    }

    // Update order status to 'Canceled'
    const canceledOrder = await prisma.shopOrder.update({
      where: { id: order.id },
      data: { order_status_id: 5 }, // Assuming 5 is 'Canceled' status
    });

    // Fetch status names
    const previousStatus = order.order_status.status;
    const newStatus = await prisma.orderStatus.findUnique({
      where: { id: 5 }, // Fetch the 'Canceled' status
    });

    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        previousStatus: previousStatus, // Current status name
        newStatus: newStatus.status, // New status name
        changedById: userId,
        reason: "Order canceled By User",
        changedAt: new Date(),
        automated: false,
      },
    });

    return structureResponse(canceledOrder, 1, "Order canceled successfully");
}


async returnOrder(orderId, userId) {
  const order = await prisma.shopOrder.findUnique({
      where: { id: parseInt(orderId, 10) },
      include: {
          orderLines: true,
          order_status: true, // Include current status for validation
      },
  });

  if (!order) {
      return structureResponse({}, 0, "Order not found");
  }
  if (order.userId !== userId) {
      return structureResponse({}, 0, "Not authorized to return this order");
  }

  console.log("order status is ", order.order_status_id);
  // Check if the order can be returned
  if (order.order_status_id !== 4) { // Assuming 4 is 'Delivered' status
      return structureResponse({}, 0, "Order cannot be returned");
  }

  // Update order status to 'Returned'
  const returnedOrder = await prisma.shopOrder.update({
      where: { id: order.id },
      data: { order_status_id: 6 }, // Assuming 6 is 'Returned' status
  });

  await prisma.orderStatusHistory.create({
      data: {
          orderId: order.id,
          previousStatus: order.order_status.status,
          newStatus: 'Returned', // You can get this from a lookup based on status ID
          changedAt: new Date(),
          changedById: userId,
          reason: "Order returned by user",
          automated: false,
      },
  });

  return structureResponse(returnedOrder, 1, "Order returned successfully");
} 

}

export default new OrderRepository();
