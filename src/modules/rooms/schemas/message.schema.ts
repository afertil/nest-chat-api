import { Schema } from 'mongoose';

const message = new Schema({
  message: { type: String, required: true },
  // user: { type: String },
  created_at: { type: Date, default: Date.now },
});


export const MessageSchema = message;
