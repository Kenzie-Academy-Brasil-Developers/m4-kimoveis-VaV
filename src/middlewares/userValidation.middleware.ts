import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import User from '../entities/users.entities';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors/appErrors';

const userValidation = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userId: number = Number(request.params.id);

  const user: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  response.locals.foundUser = user;

  return next();
};

export default userValidation;
