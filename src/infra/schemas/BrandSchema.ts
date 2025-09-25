import { Schema, model, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  country: string;
  foundedYear: string;
  isActive: boolean;
  createdAt: Date;
  modifiedAt?: Date | null;
}

const BrandSchema = new Schema<IBrand>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  foundedYear: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now, required: true },
  modifiedAt: { type: Date, default: null },
});

export const BrandModel = model<IBrand>('Brand', BrandSchema);
