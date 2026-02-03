import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../../config/auth_config.js'
import redis from '../../config/redis.client.js'

export async function authenticate(req, res, next) {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({ message: 'No token' })
    }

    try {
        // 1️⃣ Verificar JWT
        const decoded = jwt.verify(token, SECRET_JWT_KEY)

        // 2️⃣ Consultar Redis
        const redisToken = await redis.get(`user:${decoded.id}:token`)

        if (!redisToken) {
            return res.status(401).json({ message: 'Sesión expirada' })
        }

        if (redisToken !== token) {
            return res.status(401).json({ message: 'Token revocado' })
        }

        // 3️⃣ Adjuntar usuario
        req.user = {
            id: decoded.id,
            role: decoded.role,
            id_shop: decoded.id_shop
        }

        next()

    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}
