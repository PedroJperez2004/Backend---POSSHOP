import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

export const authRoutes = Router();
const authController = new AuthController();
authRoutes.post('/refresh-token', authController.refreshToken);

