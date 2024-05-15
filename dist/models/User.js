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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.findUserByEmail = exports.createUser = void 0;
const prisma_1 = require("../models/prisma");
const prisma = (0, prisma_1.initializePrisma)();
// Use prisma as you normally would
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.create({ data });
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({ where: { email } });
});
exports.findUserByEmail = findUserByEmail;
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, hashedPassword);
});
exports.comparePassword = comparePassword;
