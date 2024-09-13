import { PrismaClient } from "@prisma/client";
import { structureResponse } from "../utils/common.util.js";

const prisma = new PrismaClient();

class AddressRepository {
    async getAllAddresses(userId) {
        const addresses = await prisma.userAddress.findMany({
            where: { userId },
            include: {
                address: {
                    include: {
                        country: true
                    }
                }
            }
        });
        return structureResponse(addresses, 1, "Addresses fetched successfully");
    }
// In AddressRepository class
async getSingleAddress(userId, addressId) {
    try {
        // Convert addressId to an integer
        const parsedAddressId = parseInt(addressId, 10);
        const parsedUserId = parseInt(userId, 10);

        if (isNaN(parsedAddressId) || isNaN(parsedUserId)) {
            throw new Error("Invalid addressId or userId");
        }

        // Fetch the address details including the country information
        const userAddress = await prisma.userAddress.findFirst({
            where: {
                userId: parsedUserId,
                addressId: parsedAddressId,
            },
            include: {
                address: {
                    include: {
                        country: true,
                    },
                },
            },
        });

        if (!userAddress) {
            throw new Error("Address not found for the given user");
        }

        return structureResponse(userAddress, 1, "Address fetched successfully");
    } catch (error) {
        throw new Error(`Failed to fetch address: ${error.message}`);
    }
}

    async createAddress(userId, addressData) {
        try {
            // Validate country by ID
            const country = await prisma.country.findUnique({
                where: { id: addressData.country_id }, // Use ID here
            });
    
            if (!country) {
                throw new Error(`Country with ID '${addressData.country_id}' not found`);
            }
    
            // Create the address with the country ID
            const address = await prisma.address.create({
                data: {
                    unit_number: addressData.unit_number,
                    street_number: addressData.street_number,
                    address_line1: addressData.address_line1,
                    address_line2: addressData.address_line2,
                    city: addressData.city,
                    region: addressData.region,
                    postal_code: addressData.postal_code,
                    country_id: country.id, // Use ID here
                },
            });
    
            const userAddress = await prisma.userAddress.create({
                data: {
                    userId,
                    addressId: address.id,
                    is_default: addressData.is_default || false,
                },
            });
    
            return structureResponse(userAddress, 1, "Address created successfully");
        } catch (error) {
            throw new Error(`Failed to create address: ${error.message}`);
        }
    }

    async updateAddrress(addressId, userId, addressData) {
        try {
            // Convert addressId to an integer
            const parsedAddressId = parseInt(addressId, 10);
            const parsedUserId = parseInt(userId, 10);
    
            if (isNaN(parsedAddressId) || isNaN(parsedUserId)) {
                throw new Error("Invalid addressId or userId");
            }
    
            // Check if the address exists for the user
            const userAddress = await prisma.userAddress.findFirst({
                where: {
                    addressId: parsedAddressId, // Use parsed integer
                    userId: parsedUserId
                }
            });
            if (!userAddress) {
                throw new Error("Address not found for the given user");
            }
    
            // Validate country by ID
            const country = await prisma.country.findUnique({
                where: { id: addressData.country_id } // Use ID here
            });
            if (!country) {
                throw new Error(`Country with ID '${addressData.country_id}' not found`);
            }
    
            // Update the address with new data
            await prisma.address.update({
                where: { id: parsedAddressId },
                data: {
                    unit_number: addressData.unit_number,
                    street_number: addressData.street_number,
                    address_line1: addressData.address_line1,
                    address_line2: addressData.address_line2,
                    city: addressData.city,
                    region: addressData.region,
                    postal_code: addressData.postal_code,
                    country_id: country.id, // Use ID here
                },
            });
    
            // Update the userAddress entry
            const updatedUserAddress = await prisma.userAddress.update({
                where: { id: userAddress.id },
                data: {
                    is_default: addressData.is_default || userAddress.is_default
                }
            });
            return structureResponse(updatedUserAddress, 1, "Address updated successfully");
        } catch (error) {
            throw new Error(`Failed to update address: ${error.message}`);
        }
    }

    async deleteAddress(addressId, userId) {
        try {
            // Convert addressId to an integer
            const parsedAddressId = parseInt(addressId, 10);
            const parsedUserId = parseInt(userId, 10);

            if (isNaN(parsedAddressId) || isNaN(parsedUserId)) {
                throw new Error("Invalid addressId or userId");
            }

            // Check if the address exists for the user
            const userAddress = await prisma.userAddress.findFirst({
                where: { addressId: parsedAddressId, userId: parsedUserId },
            });

            if (!userAddress) throw new Error('Address not found for the given user');

            // Delete the userAddress entry
            await prisma.userAddress.delete({
                where: { id: userAddress.id },
            });

            // Delete the address entry
            await prisma.address.delete({
                where: { id: parsedAddressId },
            });

            return structureResponse({}, 1, "Address deleted successfully");
        } catch (error) {
            throw new Error(`Failed to delete address: ${error.message}`);
        }
    }
}

export default new AddressRepository();
