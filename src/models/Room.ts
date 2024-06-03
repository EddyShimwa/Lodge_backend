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

export const findRoomById = async (id: number) => {
  return await prisma.room.findUnique({ where: { id } });
}

export const findOccupiedRooms = async (startDate: Date, endDate: Date) => {
  return await prisma.room.findMany({
    where: {
      isOccupied: true,
      checkInDate: {
        gte: startDate
      },
      checkOutDate: {
        lte: endDate
      }
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

