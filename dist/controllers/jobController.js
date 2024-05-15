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
exports.removeJob = exports.getJobs = exports.getJob = exports.postJob = void 0;
const Job_1 = require("../models/Job");
const postJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const job = req.body;
    const newJob = yield (0, Job_1.createJob)(job);
    res.status(201).json(newJob);
});
exports.postJob = postJob;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const jobId = Number(id);
    if (isNaN(jobId)) {
        res.status(400).json({ error: 'Invalid job ID' });
        return;
    }
    const job = yield (0, Job_1.findJobById)(jobId);
    if (!job) {
        res.status(404).json({ error: 'Job not found' });
        return;
    }
    res.json(job);
});
exports.getJob = getJob;
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield (0, Job_1.findAllJobs)();
    res.json(jobs);
});
exports.getJobs = getJobs;
const removeJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, Job_1.deleteJob)(Number(id));
    res.json({ message: 'Job deleted successfully' });
});
exports.removeJob = removeJob;
