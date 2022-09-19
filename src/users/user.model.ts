import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true},
  phone: {type: String, required: true},
  role: {type: String, required: true}
});

export interface User extends mongoose.Document {
  id: string;
  password: string;
  email: string;
  phone: string;
  role: string;
}