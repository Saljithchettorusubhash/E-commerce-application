import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";

const prisma = new PrismaClient();

class VariationOptionRepository {
    async getAllVariationOptions() {
        const options = await prisma.variationOption.findMany(
            {
                include: {
                    variation: true
                }
            }
        );
        return structureResponse(options, 1, "Variation options fetched successfully");

    }

    async getVariationOptionById(optionId) {
        const option = await prisma.variationOption.findUnique({
            where: { id: parseInt(optionId, 10) },
            include: {
                variation: true
            }
        });
        if (!option) {
            return structureResponse({}, 0, "Variation option not found");
        }
        return structureResponse(option, 1, "Variation option fetched successfully");
    }

    async createVariationOption(optionData) {
        const variation = await prisma.variation.findUnique({
            where: { id: parseInt(optionData.variationId, 10) }
        });
        if (!variation) {
            return structureResponse({}, 0, "Variation not found");
        }
        const newOption = await prisma.variationOption.create({
            data: optionData
        })
        return structureResponse(newOption, 1, "Variation option created successfully");
    }

    async updateVariationOption(optionId, optionData) {
        const option  = await prisma.variationOption.findUnique({
            where: { id: parseInt(optionId, 10) }
        });
        if (!option) {
            return structureResponse({}, 0, "Variation option not found");
        }
        const updatedoption = await prisma.variationOption.update({
            where: { id: parseInt(optionId, 10) },
            data: optionData
        });
        return structureResponse(updatedoption, 1, "Variation option updated successfully");
    }
    async deleteVariationOption(optionId) {
        const option = await prisma.variationOption.findUnique({
            where: { id: parseInt(optionId, 10) }
        });
        if (!option) {
            return structureResponse({}, 0, "Variation option not found");
        }
        await prisma.variationOption.delete({
            where: { id: parseInt(optionId, 10) }
        });
        return structureResponse({}, 1, "Variation option deleted successfully");
    }


}
export default new VariationOptionRepository();
