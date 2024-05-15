// prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

export function initializePrisma(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}