import { Repository } from 'typeorm';
import {
  UserRequest,
  UserRequestUpdate,
  UserResponse,
} from '../interfaces/user.interface';
import User from '../entities/users.entities';
import { AppDataSource } from '../data-source';
import { userResponseSchema } from '../schemas/user.schema';

const userCreationService = async (
  userInformation: UserRequest
): Promise<UserResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepo.create(userInformation);

  const userEntry: UserResponse = userResponseSchema.parse(user);

  return userEntry;
};

const userReadingService = async (): Promise<UserResponse[]> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] | null = await userRepo.find();

  const usersResponse: UserResponse[] = users.map((user: User) =>
    userResponseSchema.parse(user)
  );

  return usersResponse;
};

const userUpdatingService = async (
  userInformation: UserRequestUpdate,
  userId: number
): Promise<UserResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const outdatedData: User | null = await userRepo.findOneBy({
    id: userId,
  });

  const updatedData: User = userRepo.create({
    ...outdatedData,
    ...userInformation,
  });

  await userRepo.save(updatedData);

  const userUpdatedInfo: UserResponse = userResponseSchema.parse(updatedData);

  return userUpdatedInfo;
};

const userDeletionService = async (userId: number): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({
    id: userId,
  });

  await userRepo.softRemove(user!);
};

export default { userCreationService, userReadingService, userUpdatingService, userDeletionService };
