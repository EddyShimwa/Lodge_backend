"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const prisma = new client_1.PrismaClient();
// Connect to the database
prisma.$connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error:', err));
//use cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express_1.default.json());
app.use('/api', authRoutes_1.default);
app.use('/api', usersRoutes_1.default);
app.use('/api', jobRoutes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.listen(PORT, () => {
    console.log(`Your Server is running on port ${PORT}`);
});
exports.default = app;
