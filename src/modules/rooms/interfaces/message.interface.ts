import { Document } from 'mongoose';

export interface Message extends Document {
  message: String;
  // user: String;
  created_at: Date;
}
