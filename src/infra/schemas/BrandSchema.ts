import { Schema, model, Document } from 'mongoose';

export interface IBrand extends Document {
  name: string;
  country: string;
  foundedYear: string;
  isActive: boolean;
  createdAt: Date;
}

const BrandSchema = new Schema<IBrand>({
  name: { type: String, required: true },
  country: { type: String, required: true },
  foundedYear: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const BrandModel = model<IBrand>('Brand', BrandSchema);
