import { Request, Response } from 'express';
import { CategoryRequest } from '../interfaces/categories.interfaces';
import categoriesServices from '../services/categories.services';

const categoryCreationController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categoryInfo: CategoryRequest = request.body;

  const newCategory = await categoriesServices.categoryCreationService(
    categoryInfo
  );

  return response.status(201).json(newCategory);
};

const categoryReadingController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const readingCategory: CategoryRequest[] =
    await categoriesServices.CategoryReadingService();

  return response.json(readingCategory);
};

const categoryRecordByRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  const categoryRecordByRealEstate =
    await categoriesServices.CategoryRecordByRealEstateService(Number(id));

  return response.json(categoryRecordByRealEstate);
};

export  {
  categoryCreationController,
  categoryReadingController,
  categoryRecordByRealEstateController,
};
