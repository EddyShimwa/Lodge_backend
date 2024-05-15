import { initializePrisma } from './prisma';

const prisma = initializePrisma();

export interface RoomDocument {
  id?: number;
  roomNumber: number;
  isOccupied: boolean;
  price: number;
  occupantName?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export const createRoom = async (data: RoomDocument) => {
  return await prisma.room.create({ data });
};

export const findRoomByNumber = async (roomNumber: number) => {
  return await prisma.room.findUnique({ where: { roomNumber } });
};

export const findAllRooms = async () => {
  return await prisma.room.findMany();
};

export const findAvailableRooms = async () => {
  return await prisma.room.findMany({
    where: {
      isOccupied: false
    }
  });
};

export const findOccupiedRooms = async () => {
  return await prisma.room.findMany({
    where: {
      isOccupied: true
    }
  });
};

export const deleteRoom = async (id: number) => {
  await prisma.room.delete({ where: { id } });
};

export const updateRoom = async (roomNumber: number, data: Partial<RoomDocument>) => {
  return await prisma.room.update({
    where: { roomNumber },
    data,
  });
};

export const initializeRooms = async () => {
  const rooms: RoomDocument[] = Array.from({ length: 15 }, (_, i) => ({
    roomNumber: i + 1,
    isOccupied: false,
    price: 100, // Set a default price
  }));

  for (const room of rooms) {
    // Check if the room already exists
    const existingRoom = await findRoomByNumber(room.roomNumber);
    if (!existingRoom) {
      // If the room doesn't exist, create it
      await createRoom(room);
    }
  }
};