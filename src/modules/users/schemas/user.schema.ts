import { Schema } from 'mongoose';

const user = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  admin: Boolean,
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

/**
 * On every save, add the date
 */
user.pre('save', function(next) {
  const currentDate = new Date();

  this.updated_at = currentDate;
  next();
});

/**
 * Serialize user to send it throw the JWT token
 */
user.methods.serialize = function(user) {
  return {
    _id: user._id,
    username: user.username,
    email: user.email
  };
};

export const UserSchema = user;
