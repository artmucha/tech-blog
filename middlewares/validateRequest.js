import { validationResult } from 'express-validator';
import { RequestValidationError } from 'errors/requestValidationErrors';

export const validateRequest = (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
  }
};