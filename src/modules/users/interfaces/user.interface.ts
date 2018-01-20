import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly username?: string;
  readonly admin?: boolean;
  readonly created_at: Date;
  readonly updated_at: Date;
}
