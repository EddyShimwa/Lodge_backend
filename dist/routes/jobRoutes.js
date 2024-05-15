"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController_1 = require("../controllers/jobController");
const authsMiddleware_1 = require("../Middleware/authsMiddleware");
const router = express_1.default.Router();
router.post('/postJob', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, jobController_1.postJob);
router.get('/jobs/:id', jobController_1.getJob);
router.get('/jobs', jobController_1.getJobs);
router.delete('/jobs/:id', authsMiddleware_1.isAuthenticated, authsMiddleware_1.isAdmin, jobController_1.removeJob);
exports.default = router;
