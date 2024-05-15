import express from 'express';
import { postFeedback, getFeedbacks } from '../controllers/feedBackController';

const router = express.Router();

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Post a feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: number
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: The feedback was successfully created
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.post('/feedback', postFeedback);

/**
 * @swagger
 * /feedback/all:
 *   get:
 *     summary: Get all feedbacks
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: A list of all feedbacks
 *       500:
 *         description: There was an error processing your request
 */
router.get('/feedback/all', getFeedbacks);

export default router;