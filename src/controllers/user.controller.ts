import { Request, Response } from 'express';
import {
  UserRequest,
  UserRequestUpdate,
  UserResponse,
} from '../interfaces/user.interface';

import usersServices from '../services/users.services';

const userCreationController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userInfo: UserRequest = request.body;

  const newUserInfo = await usersServices.userCreationService(userInfo);

  return response.status(201).json(newUserInfo);
};

const userReadingController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users: UserResponse[] = await usersServices.userReadingService();

  return response.json(users);
};

const userUpdatingController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userInfo: UserRequestUpdate = request.body;

  const userId: number = Number(request.params.id);

  const updatedUserInfo = await usersServices.userUpdatingService(
    userInfo,
    userId
  );

  return response.status(200).json(updatedUserInfo);
};

const userDeletionController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = Number(request.params.id);

  await usersServices.userDeletionService(userId);

  return response.status(204).json();
};

export {
  userCreationController,
  userReadingController,
  userUpdatingController,
  userDeletionController,
};
