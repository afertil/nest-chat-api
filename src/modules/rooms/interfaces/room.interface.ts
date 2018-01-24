import { Document } from 'mongoose';

export interface Room extends Document {
  name: String;
  description?: String;
  created_at: Date;
  updated_at: Date;
}
