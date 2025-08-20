import { Request, Response, NextFunction } from 'express';

// Middleware global para tratamento de erros
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }
  const status = err.status || 500;
  const mensagem = err.mensagem || err.message || 'Erro interno do servidor';
  res.status(status).json({ mensagem });
}
