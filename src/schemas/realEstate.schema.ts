import { z } from 'zod';

import { addressSchema, addressRequestSchema } from './addresses.schema';

import { categorySchema } from './categories.schema';

const realEstateSchema = z.object({
  id: z.number(),
  value: z.string().or(z.number()).default(0),
  size: z.number().positive(),
  address: addressSchema,
  category: categorySchema,
  sold: z.boolean().default(false),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

const realEstateRequestSchema = z.object({
  value: z.string().or(z.number()).default(0),
  size: z.number().int().positive(),
  address: addressRequestSchema,
  categoryId: z.number(),
});

const multipleRealEstateResponseSchema = z.array(realEstateSchema);

const realEstateScheduleResponseSchema = realEstateSchema.extend({
  multipleRealEstateResponseSchema,
});

export {
  realEstateSchema,
  realEstateRequestSchema,
  multipleRealEstateResponseSchema,
  realEstateScheduleResponseSchema,
};
