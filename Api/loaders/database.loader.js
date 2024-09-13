import { PrismaClient } from '@prisma/client';
import { Config } from '../configs/Config.js';

class DatabaseLoader {
    static prisma;
    static async init () {
        const prisma = new PrismaClient({
            datasources:{
                db:{
                    url:Config.DATABASE_URL,
                },
            },
        });
        prisma.$connect()
        .then(()=>console.log('Database Connected'))
        .catch((error)=>console.error('Database connection failed',error));

        return prisma;
    }
}

export {DatabaseLoader}