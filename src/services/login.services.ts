import 'dotenv/config';
import { Repository } from 'typeorm';
import { LoginRequest } from '../interfaces/login.interfaces';
import User from '../entities/users.entities';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors/appErrors';
import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';

const tokenCreationService = async (
  loginData: LoginRequest
): Promise<string> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOne({
    where: {
      email: loginData.email,
    },
  });

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const passwordConfirmation = await compare(loginData.password, user.password);

  if (!passwordConfirmation) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign({}, process.env.SECRET_KEY!, {
    expiresIn: '48H',
    subject: user.id.toString(),
  });

  return token;
};

export default { tokenCreationService };
