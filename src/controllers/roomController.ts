import { Request, Response } from 'express';
import { createRoom, findRoomByNumber, findAllRooms, deleteRoom,  updateRoom, RoomDocument, findOccupiedRooms } from '../models/Room';
import puppeteer from 'puppeteer';

export const postRoom = async (req: Request, res: Response) => {
  const room: RoomDocument = req.body;
  const existingRoom = await findRoomByNumber(room.roomNumber);
  if (existingRoom) {
    res.status(409).json({ error: 'Room already exists' });
    return;
  }
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
 
export const removeAllRooms = async (req: Request, res: Response) => {
  const rooms = await findAllRooms();
  rooms.forEach(async (room) => {
    await deleteRoom(room.id);
  });
  res.json({ message: 'All rooms deleted successfully' });
}

export const setRoomAsOccupied = async (req: Request, res: Response) => {
  const { roomNumber, numberOfDays } = req.params;

  const roomNum = Number(roomNumber);
  const days = Number(numberOfDays);

  if (isNaN(roomNum) || isNaN(days)) {
    res.status(400).json({ error: 'Invalid room number or number of days' });
    return;
  }

  const room = await findRoomByNumber(roomNum);

  if (!room) {
    res.status(404).json({ error: 'Room not found' });
    return;
  }

  const totalPrice = room.price * days;

  const updatedRoom = await updateRoom(roomNum, { isOccupied: true, price: totalPrice });

  if (!updatedRoom) {
    res.status(500).json({ error: 'Failed to update room' });
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


export const generateWeeklyReport = async (req: Request, res: Response) => {
  // Fetch all rooms that are currently occupied
  const occupiedRooms = await findOccupiedRooms();

  // Calculate the total price for each room and the total amount
  let totalAmount = 0;
const roomReports = occupiedRooms.map((room: RoomDocument) => {
  if (room.checkInDate && room.checkOutDate) {
    const daysOccupied = Math.ceil((new Date(room.checkOutDate).getTime() - new Date(room.checkInDate).getTime()) / (1000 * 60 * 60 * 24));
     const totalPrice = room.price * daysOccupied;
    totalAmount += totalPrice;

    return {
      roomNumber: room.roomNumber,
      price: room.price,
      daysOccupied,
      totalPrice,
    };
  });

  // Define the HTML content
  const htmlContent = `
    <h1>Weekly Report</h1>
    ${roomReports.map(room => `
      <h2>Room Number: ${room.roomNumber}</h2>
      <p>Price per day: ${room.price}</p>
      <p>Days Occupied: ${room.daysOccupied}</p>
      <p>Total Price: ${room.totalPrice}</p>
    `).join('')}
    <h2>Total Amount: ${totalAmount}</h2>
  `;

  // Generate the PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  // Now you can send this PDF to the client or save it in your server
  res.json({
    roomReports,
    totalAmount,
    pdf
  });
};