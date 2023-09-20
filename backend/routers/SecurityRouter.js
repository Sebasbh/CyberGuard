import express from 'express';

import { authenticateTokenAndCheckUserRole, requireAdmin } from '../middleware/middlewares.js';
import { createSecurityLog, deleteSecurityLogById, getAllSecurityLogs, getSecurityById, updateSecurityLogById } from '../controllers/SecurityController.js';

const SecurityRouter = express.Router();

SecurityRouter.post('/', authenticateTokenAndCheckUserRole, requireAdmin, createSecurityLog );

SecurityRouter.get('/', authenticateTokenAndCheckUserRole, requireAdmin, getAllSecurityLogs);

SecurityRouter.get('/:id', authenticateTokenAndCheckUserRole, requireAdmin, getAllSecurityLogs);

SecurityRouter.put('/:id', authenticateTokenAndCheckUserRole, requireAdmin, updateSecurityLogById);

SecurityRouter.delete('/:id', authenticateTokenAndCheckUserRole, requireAdmin, deleteSecurityLogById);

SecurityRouter.get('/:id', authenticateTokenAndCheckUserRole, requireAdmin, getSecurityById); 

export default SecurityRouter; 