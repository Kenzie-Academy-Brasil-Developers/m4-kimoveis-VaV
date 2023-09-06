import { Router } from 'express';
import {
  realEstateScheduleListingController,
  scheduleCreationController,
} from '../controllers';
import middlewares from '../middlewares';
import { scheduleRequestSchema } from '../schemas';

const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  '/',
  middlewares.tokenValidation,
  middlewares.dataValidation(scheduleRequestSchema),
  scheduleCreationController
);

scheduleRoutes.get(
  '/realEstate/:id',
  middlewares.tokenValidation,
  middlewares.adminValidation,
  realEstateScheduleListingController
);

export default scheduleRoutes;
