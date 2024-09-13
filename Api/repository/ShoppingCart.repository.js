import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";
import { parse } from "dotenv";
const prisma = new PrismaClient();

class ShoppingCartRepository {
  async getShoppingCart(userId) {
    const cart = await prisma.shoppingCart.findMany({
      where: { userId: parseInt(userId, 10) },
      include: {
        items: {
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
    if (!cart) {
      return structureResponse({}, 0, "Shopping cart not found");
    }
    return structureResponse(cart, 1, "Shopping cart fetched successfully");
  }

  async addItemToCart(userId, itemData) {
    const productItemId = parseInt(itemData.productItemId, 10);
    if (isNaN(productItemId)) {
      return structureResponse({}, 0, "Invalid product item ID");
    }

    const productItem = await prisma.productItem.findUnique({
      where: { id: productItemId },
    });
    if (!productItem) {
      return structureResponse({}, 0, "Product not found");
    }

    const cart = await prisma.shoppingCart.upsert({
      where: { userId: parseInt(userId, 10) },
      update: {},
      create: { userId: parseInt(userId, 10) },
    });

    const newItem = await prisma.shoppingCartItem.create({
      data: {
        cartId: cart.id,
        productItemId: productItemId,
        qty: itemData.qty,
      },
    });

    return structureResponse(newItem, 1, "Item added to cart successfully");
  }

  async updateCartItem(itemId, qty) {
    const parsedItemId = parseInt(itemId, 10);
    if (isNaN(parsedItemId)) {
      return structureResponse({}, 0, "Invalid cart item ID");
    }

    const item = await prisma.shoppingCartItem.findUnique({
      where: { id: parsedItemId },
    });

    if (!item) {
      return structureResponse({}, 0, "Cart item not found");
    }

    const updatedItem = await prisma.shoppingCartItem.update({
      where: { id: parsedItemId },
      data: { qty },
    });

    return structureResponse(updatedItem, 1, "Cart item updated successfully");
  }


  async deleteCartItem(itemId) {
    const parsedItemId = parseInt(itemId, 10);
    if (isNaN(parsedItemId)) {
      return structureResponse({}, 0, "Invalid cart item ID");
    }

    const item = await prisma.shoppingCartItem.findUnique({
      where: { id: parsedItemId },
    });

    if (!item) {
      return structureResponse({}, 0, "Cart item not found");
    }

    await prisma.shoppingCartItem.delete({
      where: { id: parsedItemId },
    });

    return structureResponse({}, 1, "Cart item deleted successfully");
  }

  async clearCart(userId) {
    await prisma.shoppingCartItem.deleteMany({
      where: { cartId: parseInt(userId, 10) },
    });
    return structureResponse({}, 1, "cart cleared successfully");
  }
}
export default new ShoppingCartRepository();
