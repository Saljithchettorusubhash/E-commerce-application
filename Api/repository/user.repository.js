import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UserRole } from '../utils/enums/userRoles.utils.js';
import { structureResponse, hashPassword } from "../utils/common.util.js";

const prisma = new PrismaClient();

class UserRepository {
    async findAllUser() {
        const users = await prisma.user.findMany();
        users.forEach(user => delete user.password);
        return structureResponse(users, 1, "Users fetched successfully");
    }

    async findOneUser(params) {
        const userId = parseInt(params.id, 10); // Ensure userId is an integer
        if (isNaN(userId)) {
            throw new Error("Invalid user id");
        }
        const user = await prisma.user.findUnique({
            where: { id: userId } // Correctly pass the integer userId
        });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        delete user.password;
        return structureResponse(user, 1, "User fetched successfully");
    }

    async createUser(data) {
        if (!Object.values(UserRole).includes(data.role.toUpperCase())) {
            throw new Error("Invalid user role");
        }
        data.password = await bcrypt.hash(data.password, 8);
        data.role = data.role.toUpperCase();
        const user = await prisma.user.create({ data });
        delete user.password;
        return structureResponse(user, 1, "User created successfully");
    }

    async updateUser(data, filter) {
        const userId = parseInt(filter.id, 10); // Ensure userId is an integer
        if (isNaN(userId)) {
            throw new Error("Invalid user id");
        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 8);
        }
        if (data.role) {
            if (!Object.values(UserRole).includes(data.role.toUpperCase())) {
                throw new Error("Invalid user role");
            }
            data.role = data.role.toUpperCase();
        }
        const user = await prisma.user.update({
            where: { id: userId }, // Correctly pass the integer userId
            data
        });
        delete user.password;
        return structureResponse(user, 1, "User updated successfully");
    }

    async deleteUser(id) {
        const userId = parseInt(id, 10); 
        if (isNaN(userId)) {
            throw new Error("Invalid user id");
        }
        await prisma.user.delete({ where: { id: userId } }); 
        return structureResponse({}, 1, "User deleted successfully");
    }
}

export default new UserRepository();
