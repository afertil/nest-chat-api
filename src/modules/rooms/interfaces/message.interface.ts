import { Document } from 'mongoose';
import { User } from '../../users/interfaces/user.interface';

export interface Message extends Document {
  message: String;
  user: User;
  date: Date;
}
