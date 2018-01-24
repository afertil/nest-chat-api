import { Schema } from 'mongoose';

const room = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

/**
 * On every save, add the date
 */
room.pre('save', function(next) {
  const currentDate = new Date();

  this.updated_at = currentDate;
  next();
});

export const RoomSchema = room;
