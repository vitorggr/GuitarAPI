import { inject, injectable } from 'tsyringe';
import { IBrandRepository } from '../domain/repositories/IBrandRepository';
import { IBrand } from '../infra/schemas/BrandSchema';

@injectable()
export class BrandService {
  constructor(
    @inject('IBrandRepository') private brandRepository: IBrandRepository
  ) {}

  async getAll(): Promise<IBrand[]> {
    return this.brandRepository.findAll();
  }

  async getById(id: string): Promise<IBrand | null> {
    return this.brandRepository.findById(id);
  }

  async create(data: Partial<IBrand>): Promise<IBrand> {
    return this.brandRepository.create(data);
  }

  async update(id: string, data: Partial<IBrand>): Promise<IBrand | null> {
    return this.brandRepository.update(id, data);
  }

  async remove(id: string): Promise<IBrand | null> {
    return this.brandRepository.delete(id);
  }
}
