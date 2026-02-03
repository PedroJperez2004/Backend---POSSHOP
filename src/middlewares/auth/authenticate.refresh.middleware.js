import jwt from 'jsonwebtoken'
import { REFRESH_JWT_SECRET } from '../../config/auth_config.js'
import { redis } from '../../config/redis.client.js'

export async function authenticateRefresh(req, res, next) {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token' });
        }

        const payload = jwt.verify(refreshToken, REFRESH_JWT_SECRET);

        const redisRefresh = await redis.get(
            `user:${payload.id}:refreshToken`
        );

        if (!redisRefresh || redisRefresh !== refreshToken) {
            return res.status(403).json({ message: 'Refresh token inválido' });
        }
        req.refreshPayload = payload;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Refresh token inválido o expirado' });
    }
}
