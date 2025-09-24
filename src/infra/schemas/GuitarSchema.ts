import { Schema, model, Types, Document, Model } from 'mongoose';

export interface IGuitar {
  model: string;
  brandId: Types.ObjectId;
  year: number;
  strings: number;
  notes?: string | null;
}

export type IGuitarDocument = Document & IGuitar;
export type IGuitarModel = Model<IGuitarDocument>;

const GuitarSchema = new Schema({
  model: { type: String, required: true },
  brandId: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
  year: { type: Number, required: true },
  strings: { type: Number, required: true },
  notes: { type: String },
});

export const GuitarModel = model('Guitar', GuitarSchema);
