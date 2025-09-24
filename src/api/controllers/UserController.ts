import { Request, Response, NextFunction } from 'express';
import { container } from '../../config/container';
import { UserService } from '../../services/UserService';

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const userService = container.resolve<UserService>(UserService);
      const newUser = await userService.register(username, password);
      res.status(201).json({ id: newUser._id, username: newUser.username });
    } catch (err: any) {
      if (err.message === 'Usuário já existe') {
        return res.status(400).json({ mensagem: err.message });
      }
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const userService = container.resolve<UserService>(UserService);
      const token = await userService.login(username, password);
      return res.json({ token });
    } catch (err: any) {
      if (err.message === 'Credenciais inválidas') {
        return res.status(401).json({ mensagem: err.message });
      }
      next(err);
    }
  }

  static async authorize(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ mensagem: 'Token não informado' });
      }
      const userService = container.resolve<UserService>(UserService);
      const result = await userService.authorize(token);
      if (!result.valid) {
        return res.status(401).json({ valid: false });
      }
      res.json({ valid: true, payload: result.payload });
    } catch (err) {
      next(err);
    }
  }
}
