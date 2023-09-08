import { Request, Response } from 'express';
import { LoginRequest } from '../interfaces/login.interfaces';
import { tokenCreationService } from '../services';
import loginServices from '../services/login.services';

const tokenCreationController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const loginInfo: LoginRequest = request.body;

  const token = await loginServices.tokenCreationService(loginInfo);

  return response.json({ token });
};

export { tokenCreationController };
