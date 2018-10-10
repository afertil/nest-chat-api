import { Document } from 'mongoose';
import { Message } from './message.interface';
import { User } from '../../users/interfaces/user.interface';

export interface Room extends Document {
  name: String;
  description?: String;
  is_user: Boolean;
  is_private: Boolean;
  users?: User[];
  messages?: Message[];
  created_at: Date;
  updated_at: Date;
}
