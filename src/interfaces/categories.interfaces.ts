import { z } from 'zod';
import {
  categoriesResponseSchema,
  categoryRequestSchema,
  categorySchema,
} from '../schemas/categories.schema';

type Category = z.infer<typeof categorySchema>;

type CategoryRequest = z.infer<typeof categoryRequestSchema>;

type CategoryResponse = z.infer<typeof categorySchema>;

type MultipleCategoriesResponse = z.infer<typeof categoriesResponseSchema>;

export {
  Category,
  CategoryRequest,
  CategoryResponse,
  MultipleCategoriesResponse,
};
