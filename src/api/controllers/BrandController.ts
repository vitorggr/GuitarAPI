  // ...existing code...
import { Request, Response } from 'express';


import { container } from '../../config/container';
import { BrandService } from '../../services/BrandService';

export class BrandController {

  // Listar todas as marcas
  static async getAll(req: Request, res: Response, next: Function) {
    try {
  const service = container.resolve<BrandService>('BrandService');
  const brands = await service.getAll();
  res.json(brands);
    } catch (err) {
      next(err);
    }
  }


  // Buscar marca por ID
  static async getById(req: Request, res: Response, next: Function) {
    try {
      const service = container.resolve<BrandService>('BrandService');
      const brand = await service.getById(req.params.id);
      if (!brand) {
        const err: any = new Error('Marca não encontrada');
        err.status = 404;
        throw err;
      }
      res.json(brand);
    } catch (err) {
      next(err);
    }
  }


  // Criar nova marca
  static async create(req: Request, res: Response, next: Function) {
    try {
  const service = container.resolve<BrandService>('BrandService');
  const newBrand = await service.create(req.body);
  res.status(201).json(newBrand);
    } catch (err) {
      next(err);
    }
  }


  // Atualizar marca
  static async update(req: Request, res: Response, next: Function) {
    try {
      const service = container.resolve<BrandService>('BrandService');
      const updated = await service.update(req.params.id, req.body);
      if (!updated) {
        const err: any = new Error('Marca não encontrada');
        err.status = 404;
        throw err;
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }


  // Remover marca
  static async remove(req: Request, res: Response, next: Function) {
    try {
      const service = container.resolve<BrandService>('BrandService');
      const deleted = await service.remove(req.params.id);
      if (!deleted) {
        const err: any = new Error('Marca não encontrada');
        err.status = 404;
        throw err;
      }
      res.json(deleted);
    } catch (err) {
      next(err);
    }
  }
}
