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

USER_SCHEMA.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    const SALT = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, SALT);
  }
});

const USER = mongoose.model('User', USER_SCHEMA);
export default USER;
