"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.findAllJobs = exports.findJobById = exports.createJob = void 0;
const prisma_1 = require("../models/prisma");
const prisma = (0, prisma_1.initializePrisma)();
const createJob = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.job.create({ data });
});
exports.createJob = createJob;
const findJobById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.job.findUnique({ where: { id } });
});
exports.findJobById = findJobById;
const findAllJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.job.findMany({
        where: {
            isAvailable: true
        }
    });
});
exports.findAllJobs = findAllJobs;
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.job.delete({ where: { id } });
});
exports.deleteJob = deleteJob;
