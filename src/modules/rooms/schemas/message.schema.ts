import { Schema } from 'mongoose';

const message = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true }
});

export const MessageSchema = message;
