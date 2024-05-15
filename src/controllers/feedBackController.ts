import { Request, Response } from 'express';
import { FeedbackDocument, createFeedback, getAllFeedbacks } from '../models/feedBack';

export const postFeedback = async (req: Request, res: Response): Promise<void> => {
  const feedbackData: FeedbackDocument = {
    roomId: req.body.roomId,
    rating: req.body.rating,
    comment: req.body.comment,
  };

  try {
    const newFeedback = await createFeedback(feedbackData);
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: 'There was an error processing your request' });
  }
};

export const getFeedbacks = async (req: Request, res: Response): Promise<void> => {
  try {
    const feedbacks = await getAllFeedbacks();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'There was an error processing your request' });
  }
};