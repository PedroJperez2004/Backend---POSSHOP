import jwt from 'jsonwebtoken';
import redis from '../../../config/redis.client.js';
import { SECRET_JWT_KEY } from '../../../config/auth_config.js';

export class AuthController {
    async refreshToken(req, res) {
        try {
            const { id, role, id_shop } = req.refreshPayload;
            const isProd = process.env.NODE_ENV === 'production';

            const newAccessToken = jwt.sign(
                { id, role, id_shop },
                SECRET_JWT_KEY,
                { expiresIn: '1h' }
            );

            // Guardamos en Redis (Docker local o Upstash producción)
            await redis.set(
                `user:${id}:token`,
                newAccessToken,
                { EX: 3600 }
            );

            // Configuración de la Cookie dinámica
            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                secure: isProd, // true en prod (requiere HTTPS)
                sameSite: isProd ? 'none' : 'strict', // 'none' en prod, 'strict' en local
                maxAge: 1000 * 60 * 60
            });

            return res.json({ ok: true });
        } catch (error) {
            console.error("Error en refreshToken:", error);
            return res
                .status(403)
                .json({ message: 'Refresh token expirado o inválido' });
        }
    }
}
