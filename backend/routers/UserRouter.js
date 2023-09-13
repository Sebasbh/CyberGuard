import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from '../controllers/UserController.js';
import { apiLimiter, authenticateTokenAndCheckUserRole, loginLimiter, requireAdmin } from '../middleware/middlewares.js';

const UserRouter = express.Router();

UserRouter.post('/login', /* loginLimiter, */ loginUser);

UserRouter.post('/', apiLimiter, authenticateTokenAndCheckUserRole, requireAdmin, createUser);

UserRouter.get('/', apiLimiter, authenticateTokenAndCheckUserRole, requireAdmin, getUsers);

UserRouter.get('/:id', apiLimiter, authenticateTokenAndCheckUserRole, requireAdmin, getUserById);

UserRouter.put('/:id', apiLimiter, authenticateTokenAndCheckUserRole, requireAdmin, updateUser);

UserRouter.delete('/:id', apiLimiter, authenticateTokenAndCheckUserRole, requireAdmin, deleteUser);

export default UserRouter;

