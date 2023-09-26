import express from 'express';

import { authenticateTokenAndCheckUserRole, requireAdmin } from '../middleware/middlewares.js';
import { blockIPById, createSecurityLog, deleteSecurityLogById, getAllSecurityLogs, getSecurityById, unblockIPById, updateSecurityLogById } from '../controllers/SecurityController.js';

const SecurityRouter = express.Router();

SecurityRouter.post('/', authenticateTokenAndCheckUserRole, requireAdmin, createSecurityLog );

SecurityRouter.get('/', authenticateTokenAndCheckUserRole, requireAdmin, getAllSecurityLogs);

SecurityRouter.put('/:id', authenticateTokenAndCheckUserRole, requireAdmin, updateSecurityLogById);

SecurityRouter.delete('/:id', authenticateTokenAndCheckUserRole, requireAdmin, deleteSecurityLogById);

SecurityRouter.get('/:id', authenticateTokenAndCheckUserRole, requireAdmin, getSecurityById); 

SecurityRouter.put('/block/:id', authenticateTokenAndCheckUserRole, requireAdmin, blockIPById); 

SecurityRouter.put('/unblock/:id', authenticateTokenAndCheckUserRole, requireAdmin, unblockIPById); 

export default SecurityRouter; 