import { NextFunction, Request, Response } from 'express';
import { User, Users } from '../models/user.ts';
import { processImage as processImageData } from '../services/imageProcessingService.ts';
import bcrypt from 'bcrypt';
import db from '../db.ts';
import { incrementUserEntries } from '../services/userService.ts';

const SALT_ROUNDS = 10;

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, SALT_ROUNDS);
    db.transaction(async (trx) => {
      try {
        const result1 = await trx
          .insert({
            hash,
            email,
          })
          .into('login')
          .returning('email');

        const loginEmail = result1[0].email;

        const result2 = await trx('users').returning('*').insert({
          name,
          email: loginEmail,
          joined: new Date(),
        });

        res.status(200).json(result2[0]);
      } catch (err) {
        trx.rollback();
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const user = Users.find((u) => u.id === id);

    if (!user) res.status(404).json('User not found.');
    else res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const loginQuery = await db
      .from('login')
      .select('*')
      .where('email', '=', email);

    if (loginQuery.length < 1) {
      res.status(404).json('Invalid credentials');
      return;
    }

    const isValid = bcrypt.compareSync(password, loginQuery[0].hash);

    if (isValid) {
      const userQuery = await db
        .from('users')
        .select('*')
        .where('email', '=', email);

      res.status(200).json(userQuery[0]);
    } else {
      res.status(404).json('Invalid credentials');
    }
  } catch (error) {
    next(error);
  }
};

export const processImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { image, id: userId } = req.body;

    const detectionRegions = await processImageData(image);
    const updatedEntries = await incrementUserEntries(userId);

    res.status(200).json({ regions: detectionRegions, updatedEntries });
  } catch (error) {
    next(error);
  }
};
