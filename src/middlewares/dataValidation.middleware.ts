import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';

const dataValidation =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction) => {
    const validationOfData = schema.parse(request.body);

    request.body = validationOfData;
    return next();
  };

export default dataValidation;
