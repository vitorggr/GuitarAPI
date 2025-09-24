import { IUser } from '../../infra/schemas/UserSchema';

export interface IUserRepository {
  findByUsername(username: string): Promise<IUser | null>;
  create(data: Partial<IUser>): Promise<IUser>;
}
