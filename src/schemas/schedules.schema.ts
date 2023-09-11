import { z } from 'zod';

import { realEstateSchema } from './realEstate.schema';

import { userSchema } from './user.schema';

const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstate: realEstateSchema,
  user: userSchema,
});

const scheduleRequestSchema = scheduleSchema
  .omit({
    id: true,
    realEstate: true,
    user: true,
  })
  .extend({
    realEstateId: z.number(),
  });

const multipleSchedulesResponseSchema = z.array(scheduleSchema);

export {
  scheduleSchema,
  scheduleRequestSchema,
  multipleSchedulesResponseSchema,
};
