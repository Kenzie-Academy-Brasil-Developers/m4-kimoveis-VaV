import { Router } from 'express';
import middlewares from '../middlewares';
import { userRequestSchema, userUpdatedSchema } from '../schemas/user.schema';
import {
  userCreationController,
  userDeletionController,
  userReadingController,
  userUpdatingController,
} from '../controllers/user.controller';

const userRoutes: Router = Router();

userRoutes.post(
  '',
  middlewares.dataValidation(userRequestSchema),
  middlewares.emailValidation,
  userCreationController
);

userRoutes.get(
  '',
  middlewares.tokenValidation,
  middlewares.adminValidation,
  userReadingController
);

userRoutes.patch(
  '/:id',

  middlewares.dataValidation(userUpdatedSchema),
  middlewares.tokenValidation,
  middlewares.adminOrUserValidation,
  userUpdatingController
);

userRoutes.delete(
  '/:id',
  middlewares.tokenValidation,
  middlewares.userValidation,
  middlewares.adminOrUserValidation,
  userDeletionController
);

export default userRoutes;
