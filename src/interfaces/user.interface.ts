import { z } from 'zod';
import {
  multipleUsersResponseSchema,
  userRequestSchema,
  userResponseSchema,
} from '../schemas/user.schema';
import { DeepPartial } from 'typeorm';

type UserRequest = z.infer<typeof userRequestSchema>;

type UserResponse = z.infer<typeof userResponseSchema>;

type UserRequestUpdate = DeepPartial<UserRequest>;

type MultipleUsersResponse = z.infer<typeof multipleUsersResponseSchema>;

export { UserRequest, UserResponse, UserRequestUpdate, MultipleUsersResponse };
