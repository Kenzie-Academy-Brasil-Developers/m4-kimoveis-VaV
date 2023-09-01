import { request, response, NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import Category from '../entities/categories.entities';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors/appErrors';

const categoryValidation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryId: number =
    Number(request.body.categoryId) || Number(request.params.id);

  const category = await categoryRepo.findOne({
    where: { id: categoryId },
  });

  if (!category) {
    throw new AppError('Category not found', 404);
  }
  response.locals.foundCategory = category;

  return next();
};

export default categoryValidation;
