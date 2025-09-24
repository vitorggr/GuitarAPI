
import { injectable } from 'tsyringe';
import { UserModel, IUser } from '../schemas/UserSchema';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<IUser | null> {
    return UserModel.findOne({ username });
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    return UserModel.create(data);
  }
}
