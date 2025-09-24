import { IGuitar } from '../../infra/schemas/GuitarSchema';
import { Document } from 'mongoose';

export interface IGuitarRepository {
  create(data: Partial<IGuitar>): Promise<(IGuitar & { notes?: string | null }) & Document>;
  update(id: string, data: Partial<IGuitar>): Promise<((IGuitar & { notes?: string | null }) & Document) | null>;
  delete(id: string): Promise<((IGuitar & { notes?: string | null }) & Document) | null>;
  findAll(): Promise<((IGuitar & { notes?: string | null }) & Document)[]>;
  findById(id: string): Promise<((IGuitar & { notes?: string | null }) & Document) | null>;
}
