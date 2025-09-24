import { IBrand } from '../../infra/schemas/BrandSchema';

export interface IBrandRepository {
  create(data: Partial<IBrand>): Promise<IBrand>;
  update(id: string, data: Partial<IBrand>): Promise<IBrand | null>;
  delete(id: string): Promise<IBrand | null>;
  findAll(): Promise<IBrand[]>;
  findById(id: string): Promise<IBrand | null>;
}
