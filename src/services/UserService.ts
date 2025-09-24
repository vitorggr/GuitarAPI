import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../infra/schemas/UserSchema';
import jwt from 'jsonwebtoken';

@injectable()
export class UserService {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository
  ) {}

  async register(username: string, password: string): Promise<IUser> {
    const existing = await this.userRepository.findByUsername(username);
    if (existing) {
      throw new Error('Usuário já existe');
    }
    return this.userRepository.create({ username, password });
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findByUsername(username);
    if (user && user.password === password) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET || 'segredo',
        { expiresIn: '1h' }
      );
      return token;
    }
    throw new Error('Credenciais inválidas');
  }

  async authorize(token: string): Promise<{ valid: boolean; payload?: any }> {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'segredo');
      return { valid: true, payload };
    } catch {
      return { valid: false };
    }
  }
}
