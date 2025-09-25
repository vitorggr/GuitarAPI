import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  createdAt: Date;
  modifiedAt?: Date | null;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  modifiedAt: { type: Date, default: null },
});

export const UserModel = model<IUser>('User', UserSchema);
