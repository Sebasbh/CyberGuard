import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { encryptPasswordMiddleware, errorMiddleware } from '../middleware/middlewares.js';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
      },
      message: props =>
        `${props.value} no cumple con los requisitos de seguridad: debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 100, 
    validate: [validator.isEmail, 'Correo electrónico inválido'],
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80, 
    validate: {
      validator: (value) => /^[a-zA-Z]+$/.test(value), 
      message: 'Only letters are allowed for the name field.',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
  },
  lastLogin: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
/* 
userSchema.pre('save', async function (next) {
  try {
    await encryptPasswordMiddleware(this, next);
  } catch (error) {
    errorMiddleware(error, next);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}; */

userSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model('User', userSchema);

export default User;
