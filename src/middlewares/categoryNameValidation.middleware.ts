import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import Category from '../entities/categories.entities';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors/appErrors';

const categoryNameValidation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const multipleCategoriesRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryName: string = request.body.name;

  if (!categoryName) {
    return next();
  }

  const category = await multipleCategoriesRepo.find({
    where: { name: categoryName },
  });

  if (category.length > 0) {
    throw new AppError('Category already exists', 409);
  }

  return next();
};

export default categoryNameValidation;
