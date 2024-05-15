import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, comparePassword, UserDocument } from '../models/User';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();
import { isAuthenticated } from '../Middleware/authsMiddleware';

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ username, email, password: hashedPassword, role });
    res.status(201).json({ user });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: UserDocument | null = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    const response = { token, user: { username: user.username, email: user.email, role: user.role, user_id: user.id } };
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};