import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const USER_SCHEMA = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compares user entered password with password stored in the database.
USER_SCHEMA.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const USER = mongoose.model('User', USER_SCHEMA);
export default USER;
