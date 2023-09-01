import { Repository } from 'typeorm';
import {
  CategoryRequest,
  CategoryResponse,
} from '../interfaces/categories.interfaces';
import Category from '../entities/categories.entities';
import { AppDataSource } from '../data-source';
import { categorySchema } from '../schemas';

const categoryCreationService = async (
  categoryInfo: CategoryRequest
): Promise<CategoryResponse> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category = categoryRepo.create(categoryInfo);

  await categoryRepo.save(category);

  const categoryData: CategoryResponse = categorySchema.parse(category);

  return categoryData;
};

const CategoryReadingService = async (): Promise<CategoryResponse[]> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: Category[] | null = await categoryRepo.find();

  return categories;
};

const CategoryRecordByRealEstateService = async (
  categoryId: number
): Promise<Category> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const realEstateCategory: Category | null = await categoryRepo.findOne({
    where: { id: categoryId },
    relations: {
      realEstate: true,
    },
  });

  return realEstateCategory!;
};
export default {
  categoryCreationService,
  CategoryReadingService,
  CategoryRecordByRealEstateService,
};
