import { z } from 'zod';

const categorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const categoryRequestSchema = categorySchema.omit({
  id: true,
});

const categoriesResponseSchema = z.array(categorySchema);

export { categorySchema, categoryRequestSchema, categoriesResponseSchema };
