  // ...existing code...
import { Request, Response } from 'express';
import { JsonRepository } from '../../infra/repositories/JsonRepository';
import { Guitar } from '../../domain/Guitar';
import { v4 as uuidv4 } from 'uuid';

const repo = new JsonRepository<Guitar>(`${__dirname}/../../infra/data/guitars.json`);

export class GuitarController {
  // Listar todas as guitarras
  static async getAll(req: Request, res: Response, next: Function) {
    try {
      res.json(await repo.getAll());
    } catch (err) {
      next(err);
    }
  }

  // Buscar guitarra por ID
  static async getById(req: Request, res: Response, next: Function) {
    try {
      const guitars = await repo.getAll();
      const guitar = guitars.find(g => g.id === req.params.id);
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
      const guitars = await repo.getAll();
      const newGuitar: Guitar = { id: uuidv4(), ...req.body };
      guitars.push(newGuitar);
      await repo.saveAll(guitars);
      res.status(201).json(newGuitar);
    } catch (err) {
      next(err);
    }
  }

  // Atualizar guitarra
  static async update(req: Request, res: Response, next: Function) {
    try {
      const guitars = await repo.getAll();
      const idx = guitars.findIndex(g => g.id === req.params.id);
      if (idx === -1) {
        const err: any = new Error('Guitarra não encontrada');
        err.status = 404;
        throw err;
      }
      guitars[idx] = { ...guitars[idx], ...req.body };
      await repo.saveAll(guitars);
      res.json(guitars[idx]);
    } catch (err) {
      next(err);
    }
  }

  // Remover guitarra
  static async remove(req: Request, res: Response, next: Function) {
    try {
      const guitars = await repo.getAll();
      const idx = guitars.findIndex(g => g.id === req.params.id);
      if (idx === -1) {
        const err: any = new Error('Guitarra não encontrada');
        err.status = 404;
        throw err;
      }
      const [deleted] = guitars.splice(idx, 1);
      await repo.saveAll(guitars);
      res.json(deleted);
    } catch (err) {
      next(err);
    }
  }
}
