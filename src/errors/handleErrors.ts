import { AppError } from './appErrors';

import { Request, Response, NextFunction } from 'express';

import { ZodError } from 'zod';

const handleErrors = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return response.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }

  console.log(err);

  return response.status(500).json({
    message: 'Internal server error',
  });
};

export { handleErrors };
