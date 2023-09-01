import { Router } from 'express';
import middlewares from '../middlewares';
import { categoryRequestSchema } from '../schemas';
import {
  categoryCreationController,
  categoryReadingController,
  categoryRecordByRealEstateController,
} from '../controllers';

const categoryRoutes: Router = Router();

categoryRoutes.post(
  '',
  middlewares.dataValidation(categoryRequestSchema),
  middlewares.tokenValidation,
  middlewares.adminOrUserValidation,
  middlewares.categoryNameValidation,
  categoryCreationController
);

categoryRoutes.get('', categoryReadingController);

categoryRoutes.get(
  '/:id/realEstate',
  middlewares.categoryValidation,
  categoryRecordByRealEstateController
);

export default categoryRoutes;
