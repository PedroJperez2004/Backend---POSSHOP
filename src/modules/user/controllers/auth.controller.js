import jwt from 'jsonwebtoken';
import redis from '../../../config/redis.client.js';
import { SECRET_JWT_KEY } from '../../../config/auth_config.js';

export class AuthController {
    async refreshToken(req, res) {
        try {
            const { id, role, id_shop } = req.refreshPayload;

            const newAccessToken = jwt.sign(
                { id, role, id_shop },
                SECRET_JWT_KEY,
                { expiresIn: '1h' }
            );

            await redis.set(
                `user:${id}:token`,
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
