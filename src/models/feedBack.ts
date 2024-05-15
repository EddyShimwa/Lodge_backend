import { initializePrisma } from './prisma';

const prisma = initializePrisma();


export interface FeedbackDocument {
    id?: number;
    roomId: number;
    rating: number;
    comment: string;
    createdAt?: string;
  }
  
export const createFeedback = async (data: FeedbackDocument) => {
    return await prisma.feedback.create({ data });
  };

//get all feedbacks

export const getAllFeedbacks = async () => {
    return await prisma.feedback.findMany();
  };