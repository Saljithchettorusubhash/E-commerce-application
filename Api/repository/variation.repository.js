import { PrismaClient } from '@prisma/client';
import { structureResponse } from "../utils/common.util.js";
const prisma = new PrismaClient();

class VariationRepository {
  async getAllVariations() {
    const variations = await prisma.variation.findMany({
      include: {
        options: true,
        category: true,
      },

    });
    
    return structureResponse(variations, 1, "Variations fetched successfully");

  }

async getVariationById (variationId) {
    const variation = await prisma.variation.findUnique({
        where: { id: parseInt(variationId, 10) },
        include: {
            options: true,
        },
    });
    if(!variation){
        return structureResponse({}, 0, "Variation not found");
    }
    return structureResponse(variation, 1, "Variation fetched successfully");
}


   

async createVariation (variationData) {
    const newVariation = await prisma.variation.create({
        data:variationData
    });
    return structureResponse(newVariation, 1, "Variation created successfully");
}

async updateVariation(variationId,variationData) {
    const variation = await prisma.variation.findUnique
}

async updateVariation(variationId,variationData) {
    const variation = await prisma.variation.findUnique({
        where:{
            id:parseInt(variationId,10)
        }
    });
    if(!variation){
        return structureResponse({}, 0, "Variation not found");
    }
    const updatedVariation = await prisma.variation.update({
        where:{id:parseInt(variationId,10)},
        data:variationData
    });
    return structureResponse(updatedVariation, 1, "Variation updated successfully");
}

async deleteVariation(variationId) {
    const variation = await prisma.variation.findUnique({
        where: { id: parseInt(variationId, 10) },
    });
    if (!variation) {
        return structureResponse({}, 0, "Variation not found");
    }
    await prisma.variation.delete({
        where: { id: parseInt(variationId, 10) },
    });
    return structureResponse({}, 1, "Variation deleted successfully");
}


}
export default new VariationRepository();

