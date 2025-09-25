import { GuitarModel, IGuitar } from '../schemas/GuitarSchema';
import { injectable } from 'tsyringe';
import { IGuitarRepository } from '../../domain/repositories/IGuitarRepository';

@injectable()
export class GuitarRepository implements IGuitarRepository {
  async create(data: Partial<IGuitar>) {
    return GuitarModel.create(data);
  }

  async update(id: string, data: Partial<IGuitar>) {
    const { createdAt, ...rest } = data;
    return GuitarModel.findByIdAndUpdate(
      id,
      { ...rest, modifiedAt: new Date() },
      { new: true }
    );
  }

  async delete(id: string) {
    return GuitarModel.findByIdAndDelete(id);
  }

  async findAll() {
    return GuitarModel.find().populate('brandId');
  }

  async findById(id: string) {
    return GuitarModel.findById(id).populate('brandId');
  }
}
