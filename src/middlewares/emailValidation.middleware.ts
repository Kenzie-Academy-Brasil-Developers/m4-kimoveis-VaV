import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors/appErrors';
import User from '../entities/users.entities';

const emailValidation = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userEmail: string = request.body.email;

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  if (!userEmail) {
    return next();
  }

  const user = await userRepo.find({
    where: {
      email: userEmail
    }
  });

  if (user.length > 0) {
    throw new AppError('Email already exists', 409);
  }

  return next();
};

export default emailValidation;
