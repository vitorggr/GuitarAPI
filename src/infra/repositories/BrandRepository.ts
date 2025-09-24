import { BrandModel, IBrand } from '../schemas/BrandSchema';
import { injectable } from 'tsyringe';
import { IBrandRepository } from '../../domain/repositories/IBrandRepository';

@injectable()
export class BrandRepository implements IBrandRepository {
  async create(data: Partial<IBrand>) {
    return BrandModel.create(data);
  }

  async update(id: string, data: Partial<IBrand>) {
    return BrandModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return BrandModel.findByIdAndDelete(id);
  }

  async findAll() {
    return BrandModel.find();
  }

  async findById(id: string) {
    return BrandModel.findById(id);
  }
}
