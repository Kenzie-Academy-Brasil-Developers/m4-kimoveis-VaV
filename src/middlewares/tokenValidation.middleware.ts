import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appErrors';
import jwt from 'jsonwebtoken';

const tokenValidation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token: string | undefined = request.headers.authorization;

  if (!token) {
    throw new AppError('Missing bearer token', 401);
  }

  token = token.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    response.locals.userId = Number(decoded.sub);
    response.locals.admin = decoded.admin;
    return next();
  });
};

export default tokenValidation;
