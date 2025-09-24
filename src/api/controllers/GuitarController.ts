  // ...existing code...
import { Request, Response } from 'express';


import { container } from '../../config/container';
import { GuitarService } from '../../services/GuitarService';

export class GuitarController {

  // Listar todas as guitarras
  static async getAll(req: Request, res: Response, next: Function) {
    try {
  const service = container.resolve<GuitarService>('GuitarService');
  const guitars = await service.getAll();
  res.json(guitars);
    } catch (err) {
      next(err);
    }
  }


  // Buscar guitarra por ID
  static async getById(req: Request, res: Response, next: Function) {
    try {
      const service = container.resolve<GuitarService>('GuitarService');
      const guitar = await service.getById(req.params.id);
      if (!guitar) {
        const err: any = new Error('Guitarra não encontrada');
        err.status = 404;
        throw err;
      }
      res.json(guitar);
    } catch (err) {
      next(err);
    }
  }


  // Criar nova guitarra
  static async create(req: Request, res: Response, next: Function) {
    try {
  const service = container.resolve<GuitarService>('GuitarService');
  const newGuitar = await service.create(req.body);
  res.status(201).json(newGuitar);
    } catch (err) {
      next(err);
    }
  }


  // Atualizar guitarra
  static async update(req: Request, res: Response, next: Function) {
    try {
      const service = container.resolve<GuitarService>('GuitarService');
      const updated = await service.update(req.params.id, req.body);
      if (!updated) {
        const err: any = new Error('Guitarra não encontrada');
        err.status = 404;
        throw err;
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }


  // Remover guitarra
  static async remove(req: Request, res: Response, next: Function) {
    try {
      const service = container.resolve<GuitarService>('GuitarService');
      const deleted = await service.remove(req.params.id);
      if (!deleted) {
        const err: any = new Error('Guitarra não encontrada');
        err.status = 404;
        throw err;
      }
      res.json(deleted);
    } catch (err) {
      next(err);
    }
  }
}
