import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function ensureUserPosition(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const positionHeader = request.headers.user_position;

  if (!positionHeader) {
    throw new AppError('User position is not informed', 401);
  }

  if (positionHeader !== 'teacher') {
    throw new AppError('Only teachers can make this operation', 403);
  }

  return next();
}
