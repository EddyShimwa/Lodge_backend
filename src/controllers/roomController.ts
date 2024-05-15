import { Request, Response } from 'express';
import { createRoom, findRoomByNumber, findAllRooms, deleteRoom,  updateRoom, RoomDocument } from '../models/Room';

export const postRoom = async (req: Request, res: Response) => {
  const room: RoomDocument = req.body;

  const newRoom = await createRoom(room);
  res.status(201).json(newRoom);
};

export const getRoom = async (req: Request, res: Response) => {
  const { roomNumber } = req.params;
  const roomNum = Number(roomNumber);

  if (isNaN(roomNum)) {
    res.status(400).json({ error: 'Invalid room number' });
    return;
  }

  const room = await findRoomByNumber(roomNum);
  if (!room) {
    res.status(404).json({ error: 'Room not found' });
    return;
  }
  res.json(room);
};

export const getRooms = async (req: Request, res: Response) => {
  const rooms = await findAllRooms();
  res.json(rooms);
};

export const removeRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteRoom(Number(id));
  res.json({ message: 'Room deleted successfully' });
};

export const setRoomAsOccupied = async (req: Request, res: Response) => {
  const { roomNumber } = req.params;
  const roomNum = Number(roomNumber);

  if (isNaN(roomNum)) {
    res.status(400).json({ error: 'Invalid room number' });
    return;
  }

  const updatedRoom = await updateRoom(roomNum, { isOccupied: true });

  if (!updatedRoom) {
    res.status(404).json({ error: 'Room not found' });
    return;
  }

  res.json(updatedRoom);
};

export const setRoomAsFree = async (req: Request, res: Response) => {
  const { roomNumber } = req.params;
  const roomNum = Number(roomNumber);

  if (isNaN(roomNum)) {
    res.status(400).json({ error: 'Invalid room number' });
    return;
  }

  const updatedRoom = await updateRoom(roomNum, { isOccupied: false });

  if (!updatedRoom) {
    res.status(404).json({ error: 'Room not found' });
    return;
  }

  res.json(updatedRoom);
};