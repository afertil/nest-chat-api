import { Document } from 'mongoose';
import { Message } from './message.interface';

export interface Room extends Document {
  name: String;
  description?: String;
  is_user: Boolean;
  messages?: Message[];
  created_at: Date;
  updated_at: Date;
}
