  // ...existing code...
import { Request, Response } from 'express';
import { JsonRepository } from '../../infra/repositories/JsonRepository';
import { Brand } from '../../domain/Brand';
import { v4 as uuidv4 } from 'uuid';

const repo = new JsonRepository<Brand>(`${__dirname}/../../infra/data/brands.json`);

export class BrandController {
  // Listar todas as marcas
  static async getAll(req: Request, res: Response, next: Function) {
    try {
      res.json(await repo.getAll());
    } catch (err) {
      next(err);
    }
  }

  // Buscar marca por ID
  static async getById(req: Request, res: Response, next: Function) {
    try {
      const brands = await repo.getAll();
      const brand = brands.find(b => b.id === req.params.id);
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
      const brands = await repo.getAll();
      const newBrand: Brand = { id: uuidv4(), ...req.body };
      brands.push(newBrand);
      await repo.saveAll(brands);
      res.status(201).json(newBrand);
    } catch (err) {
      next(err);
    }
  }

  // Atualizar marca
  static async update(req: Request, res: Response, next: Function) {
    try {
      const brands = await repo.getAll();
      const idx = brands.findIndex(b => b.id === req.params.id);
      if (idx === -1) {
        const err: any = new Error('Marca não encontrada');
        err.status = 404;
        throw err;
      }
      brands[idx] = { ...brands[idx], ...req.body };
      await repo.saveAll(brands);
      res.json(brands[idx]);
    } catch (err) {
      next(err);
    }
  }

  // Remover marca
  static async remove(req: Request, res: Response, next: Function) {
    try {
      const brands = await repo.getAll();
      const idx = brands.findIndex(b => b.id === req.params.id);
      if (idx === -1) {
        const err: any = new Error('Marca não encontrada');
        err.status = 404;
        throw err;
      }
      const [deleted] = brands.splice(idx, 1);
      await repo.saveAll(brands);
      res.json(deleted);
    } catch (err) {
      next(err);
    }
  }
}
