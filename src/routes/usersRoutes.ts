import express from 'express';
import { getUsers } from '../controllers/usersController';
import { isAuthenticated, isAdmin } from '../Middleware/authsMiddleware';

const router = express.Router();
/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       403:
 *         description: Only admins can access this endpoint
 */
router.get('/users/all', isAuthenticated, isAdmin, getUsers);

export default router;