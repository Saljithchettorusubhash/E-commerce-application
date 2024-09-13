import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";
import e from "express";

const prisma = new PrismaClient();

class productConfigurationRepository {
  async getAllProductConfigurations() {
    const configuration = await prisma.productConfiguration.findMany({
      include: {
        productItem: true,
        variationOption: true,
      },
    });
    return structureResponse(
      configuration,
      1,
      "Product configurations fetched successfully"
    );
  }

  async getProductConfigurationById(productItemId, variationOptionId) {
    const configuration = await prisma.productConfiguration.findUnique({
      where: {
        productItemId_variationOptionId: {
          productItemId: parseInt(productItemId, 10),
          variationOptionId: parseInt(variationOptionId, 10),
        },
      },
      include: {
        productItem: true,
        variationOption: true,
      },
    });
    if (!configuration) {
      return structureResponse({}, 0, "Product configuration not found");
    }
    return structureResponse(
      configuration,
      1,
      "Product configuration fetched successfully"
    );
  }

  async createProductConfiguration(configurationData) {
    const productItem = await prisma.productItem.findUnique({
        where:{id:parseInt(configurationData.productItemId,10)}
    })
    if(!productItem){
        return structureResponse({},0,"Product item not found")
    }
    const variationOption = await prisma.variationOption.findUnique({
        where:{id:parseInt(configurationData.variationOptionId,10)}
    })
    if(!variationOption){
        return structureResponse({},0,"Variation option not found")
    }

    const newConfiguration = await prisma.productConfiguration.create({
      data: {
        productItemId:configurationData.productItemId,
        variationOptionId:configurationData.variationOptionId
      }
      ,
    });
    return structureResponse(
      newConfiguration,
      1,
      "Product configuration created successfully"
    );
  }

  async updateProductConfiguration(
    productItemId,
    variationOptionId,
    configurationData
  ) {


    const productItem = await prisma.productItem.findUnique({
        where:{id:parseInt(productItemId,10)}   
    });
    if(!productItem){
        return structureResponse({},0,"Product item not found")
    }
    const variationOption = await prisma.variationOption.findUnique({
        where:{id:parseInt(variationOptionId,10)}
    });
    if(!variationOption){
        return structureResponse({},0,"Variation option not found")
    }

    const updatedConfiguration = await prisma.productConfiguration.update({
      where: {
        productItemId_variationOptionId: {
          productItemId: parseInt(productItemId, 10),
          variationOptionId: parseInt(variationOptionId, 10),
        },
      },
      data: {
        productItemId:parseInt(configurationData.productItemId,10),
        variationOptionId:parseInt(configurationData.variationOptionId,10)
      },
    });
    return structureResponse(
      updatedConfiguration,
      1,
      "Product configuration updated successfully"
    );
  }

  async deleteConfiguration(productItemId, variationOptionId) {
    const configuration = await prisma.productConfiguration.findUnique({
      where: {
        productItemId_variationOptionId: {
          productItemId: parseInt(productItemId, 10),
          variationOptionId: parseInt(variationOptionId, 10),
        },
      },
    });
    if (!configuration) {
      return structureResponse({}, 0, "Product configuration not found");
    }
    await prisma.productConfiguration.delete({
      where: {
        productItemId_variationOptionId: {
          productItemId: parseInt(productItemId, 10),
          variationOptionId: parseInt(variationOptionId, 10),
        },
      },
    });
    return structureResponse(
      {},
      1,
      "Product configuration deleted successfully"
    );
  }
}

export default new productConfigurationRepository();
