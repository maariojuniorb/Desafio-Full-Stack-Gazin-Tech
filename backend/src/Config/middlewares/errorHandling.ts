import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import ErrorHandler from '../errors/errorHandler';

const errorMiddleware = (
  err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Internal server error' });
};

export default errorMiddleware;
