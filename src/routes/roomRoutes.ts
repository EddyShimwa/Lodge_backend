import express from 'express';
import { postRoom, getRoom, getRooms, removeRoom, setRoomAsOccupied, setRoomAsFree, removeAllRooms } from '../controllers/roomController';
import { isAuthenticated, isAdmin } from '../Middleware/authsMiddleware';

const router = express.Router();

router.post('/rooms', isAuthenticated, isAdmin, postRoom);
router.get('/rooms/:roomNumber', getRoom);
router.get('/rooms', getRooms);
router.delete('/rooms/:id', isAuthenticated, isAdmin, removeRoom);
router.put('/rooms/:roomNumber/occupy/:numberOfDays', isAuthenticated, isAdmin, setRoomAsOccupied);
router.put('/rooms/:roomNumber/free', isAuthenticated, isAdmin, setRoomAsFree);
router.delete('/rooms', isAuthenticated, isAdmin, removeAllRooms);

export default router;