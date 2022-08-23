import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
  campus: { type: String, required: true },
  demographic: { type: String, required: true },
  group_type: { type: String, required: true },
  meeting_date: {type: String, required: true},
  zip_code: { type: Number, required: true },
});

export interface Group extends mongoose.Document {
  id: string;
  campus: string;
  demographic: string;
  group_type: string;
  meeting_date: string,
  zip_code: number;
}
