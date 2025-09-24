import { inject, injectable } from 'tsyringe';
import { IGuitarRepository } from '../domain/repositories/IGuitarRepository';
import { IGuitar } from '../infra/schemas/GuitarSchema';

@injectable()
export class GuitarService {
  constructor(
    @inject('IGuitarRepository') private guitarRepository: IGuitarRepository
  ) {}

  async getAll(): Promise<IGuitar[]> {
    return this.guitarRepository.findAll();
  }

  async getById(id: string): Promise<IGuitar | null> {
    return this.guitarRepository.findById(id);
  }

  async create(data: Partial<IGuitar>): Promise<IGuitar> {
    return this.guitarRepository.create(data);
  }

  async update(id: string, data: Partial<IGuitar>): Promise<IGuitar | null> {
    return this.guitarRepository.update(id, data);
  }

  async remove(id: string): Promise<IGuitar | null> {
    return this.guitarRepository.delete(id);
  }
}
