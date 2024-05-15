"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePrisma = void 0;
// prisma.ts
const client_1 = require("@prisma/client");
let prisma = null;
function initializePrisma() {
    if (!prisma) {
        prisma = new client_1.PrismaClient();
    }
    return prisma;
}
exports.initializePrisma = initializePrisma;
