import { z } from 'zod';
import {
  scheduleRequestSchema,
  scheduleSchema,
} from '../schemas/schedules.schema';
import { multipleRealEstateResponseSchema } from '../schemas/realEstate.schema';

type ScheduleRequest = z.infer<typeof scheduleRequestSchema>;

type ScheduleResponse = z.infer<typeof scheduleSchema>;

type multipleScheduleResponse = z.infer<
  typeof multipleRealEstateResponseSchema
>;

export { ScheduleRequest, ScheduleResponse, multipleScheduleResponse };
