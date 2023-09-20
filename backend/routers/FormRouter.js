import express from 'express';
import { createForm, getForms, getFormById, updateForm, deleteForm } from '../controllers/FormController.js';
import { apiLimiter, authenticateTokenAndCheckUserRole,  formLimiter,  requireAdmin } from '../middleware/middlewares.js';

const FormRouter = express.Router();

FormRouter.post('/', /* formLimiter, */ createForm);
FormRouter.get('/', apiLimiter, authenticateTokenAndCheckUserRole, getForms); 
FormRouter.get('/:id', apiLimiter, authenticateTokenAndCheckUserRole, requireAdmin , getFormById);
FormRouter.put('/:id', apiLimiter, authenticateTokenAndCheckUserRole, requireAdmin, updateForm);
FormRouter.delete('/:id', apiLimiter, authenticateTokenAndCheckUserRole, requireAdmin, deleteForm);

export default FormRouter;


