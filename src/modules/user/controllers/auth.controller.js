import jwt from 'jsonwebtoken';
import { redis } from '../../../config/redis.client.js';
import { SECRET_JWT_KEY, REFRESH_JWT_SECRET } from '../../../config/auth_config.js';

export class AuthController {
    async refreshToken(req, res) {
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

            const newAccessToken = jwt.sign(
                {
                    id: payload.id,
                    role: payload.role,
                    id_shop: payload.id_shop
                },
                SECRET_JWT_KEY,
                { expiresIn: '1h' }
            );

            await redis.set(
                `user:${payload.id}:token`,
                newAccessToken,
                { EX: 3600 }
            );

            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            });

            return res.json({ ok: true });

        } catch {
            return res
                .status(403)
                .json({ message: 'Refresh token expirado o inválido' });
        }
    }
}


