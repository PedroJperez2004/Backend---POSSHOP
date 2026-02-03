import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateRefresh } from '../../../middlewares/auth/authenticate.refresh.middleware.js';

export const authRoutes = Router();
const authController = new AuthController();
authRoutes.post('/refresh-token', authenticateRefresh, authController.refreshToken);

