import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const wakeUpDatabase = async () => {
  await prisma.$connect();
  console.log('[📁] Waking up database...');
}