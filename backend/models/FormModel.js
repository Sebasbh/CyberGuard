import mongoose from 'mongoose';
import validator from 'validator';

const FormSchema = new mongoose.Schema({
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
      validator: (value) => /^[a-zA-Z]+$/.test(value), // Only letters allowed
      message: 'Only letters are allowed for the name field.',
    },
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120, 
  },  
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 400, 
  },
  status: {
    type: String,
    default: 'Nuevo',
  },
  createdBy: {
    type: String,
  },
});

const FormModel = mongoose.model('Form', FormSchema);

export default FormModel;


