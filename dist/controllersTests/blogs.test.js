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
const Image_1 = __importDefault(require("../models/Image"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("../app"));
dotenv_1.default.config();
jest.setTimeout(30000);
jest.mock('../../src/Middleware/authsMiddleware.ts', () => ({
    isAuthenticated: (req, res, next) => {
        req.user = {
            id: 'testUserId',
            username: 'testUsername',
            email: 'testEmail@test.com',
            password: 'testPassword',
            role: 'testRole',
        };
    },
    isAdmin: (req, res, next) => next(),
}));
// Connect to the database before running any tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI not defined in .env file');
    }
    try {
        yield mongoose_1.default.connect(uri);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe('POST /blogs/createBlog', () => {
    it('should create a new blog and return 201 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/blogs/createBlog')
            .send({
            title: 'Test Blog',
            image: 'test.jpg',
            description: 'This is a test blog',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('blog');
    }));
});
// Tests for /blogs/editBlog/:id endpoint
describe('PUT /blogs/editBlog/:id', () => {
    it('should edit a blog and return 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const blog = new Image_1.default({
            title: 'Test Blog',
            description: 'This is a test blog',
            image: 'test.jpg',
        });
        yield blog.save();
        const res = yield (0, supertest_1.default)(app_1.default)
            .put(`/blogs/editBlog/${blog._id}`)
            .send({
            title: 'Updated Test Blog',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.blog.title).toEqual('Updated Test Blog');
    }));
});
// Tests for /blogs/all endpoint
describe('GET /blogs/all', () => {
    it('should get all blogs and return 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get('/blogs/all');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.blogs)).toBe(true);
    }));
});
// Tests for /blogs/incrementLikes/:id endpoint
describe('POST /blogs/incrementLikes/:id', () => {
    it('should increment likes of a blog and return 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const blog = new Image_1.default({
            title: 'Test Blog',
            description: 'This is a test blog',
            image: 'test.jpg',
        });
        yield blog.save();
        const res = yield (0, supertest_1.default)(app_1.default).post(`/blogs/incrementLikes/${blog._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.blog.likesCount).toEqual(1);
    }));
});
