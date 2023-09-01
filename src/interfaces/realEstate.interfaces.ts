import { z } from 'zod';
import {
  multipleRealEstateResponseSchema,
  realEstateRequestSchema,
  realEstateScheduleResponseSchema,
  realEstateSchema,
} from '../schemas/realEstate.schema';

type RealEstateRequest = z.infer<typeof realEstateRequestSchema>;

type RealEstateResponse = z.infer<typeof realEstateSchema>;

type MultipleRealEstateResponse = z.infer<
  typeof multipleRealEstateResponseSchema
>;

type realEstateResponseSchedule = z.infer<
  typeof realEstateScheduleResponseSchema
>;

export {
  RealEstateRequest,
  RealEstateResponse,
  MultipleRealEstateResponse,
  realEstateResponseSchedule,
};
