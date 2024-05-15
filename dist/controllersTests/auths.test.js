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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const User_1 = __importDefault(require("../../src/models/User"));
const app_1 = __importDefault(require("../../src/app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let mongoServer;
let server;
// beforeEach(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const mongoUri = mongoServer.getUri();
//   await mongoose.disconnect(); 
//   await mongoose.connect(mongoUri);
//   server = app.listen(); 
// });
// afterEach(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
//   await server.close();
// });
// beforeEach(async () => {
//   await mongoose.connection.dropDatabase();
// });
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        yield mongoose_1.default.connect(mongoUri);
    }
    catch (error) {
        console.error('Failed to create MongoMemoryServer', error);
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}));
describe('POST /auth/login', () => {
    it('should login a user and return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.create({ username: 'test', email: 'test2@test.com', password: 'password', role: 'admin' });
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/login')
            .send({ email: 'test2@test.com', password: 'password' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.response).toHaveProperty('token');
        expect(res.body.response.user.username).toEqual('test');
        expect(res.body.response.user.email).toEqual('test@test.com');
    }));
});
describe('POST /auth/signup', () => {
    it('should register a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/api/auth/signup')
            .send({ username: 'test', email: '123@test.com', password: 'password', role: 'admin' });
        expect(res.statusCode).toEqual(201);
        expect(res.body.user.username).toEqual('test');
        expect(res.body.user.email).toEqual('123@test.com');
    }));
});
