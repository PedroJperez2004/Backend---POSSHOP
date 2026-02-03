import bcrypt from 'bcrypt'
import { SECRET_JWT_KEY, SALT_ROUNDS, REFRESH_JWT_SECRET } from '../../../config/auth_config.js'
import jwt from 'jsonwebtoken'
import { UserRepository } from '../repository/User.repository.js'
import { redis } from '../../../config/redis.client.js'

export class UserService {

    async loginUser({ email, password }) {
        try {
            const user = await UserRepository.findByEmail(email)
            if (!user) {
                const error = new Error('Usuario no encontrado')
                error.status = 404
                throw error
            }
            if (!user.active) {
                const error = new Error('Cuenta inactiva')
                error.status = 400
                throw error
            }

            const isValid = await bcrypt.compare(password, user.password)


            if (!isValid) {
                const error = new Error('Contraseña incorrecta')
                error.status = 401
                throw error
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                    id_shop: user.id_shop
                },
                SECRET_JWT_KEY,
                { expiresIn: '1h' }
            )

            const refreshToken = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                    id_shop: user.id_shop
                },
                REFRESH_JWT_SECRET,
                { expiresIn: '7d' }
            )
            try {
                await redis.set(
                    `user:${user.id}:refreshToken`,
                    refreshToken,
                    { EX: 604800 } // 7d
                );
                await redis.set(
                    `user:${user.id}:token`,
                    token,
                    { EX: 3600 } // 1h
                );
            } catch (e) {
                console.warn('Redis no disponible, seguimos sin cache');
            }

            const userData = { id: user.id, userName: user.userName, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, role: user.role, id_shop: user.id_shop, active: user.active };
            return { user: userData, token, refreshToken }

        } catch (error) {
            throw error
        }
    }

    async register(userData) {

        const { userName, firstName, lastName, email, phone, password, role, id_shop, active } = userData
        const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const user = await UserRepository.ifExistUsernameEmail(userName, email)

        if (user) {
            const error = new Error('El nombre de usuario o el email ya existe')
            error.status = 409
            throw error
        }
        const result = await UserRepository.register(userName, firstName, lastName, email, phone, hashPassword, role, id_shop, active)

        if (result) {
            return { message: 'Creacion de usuario exitosa' }

        }

    }

    async listUsers(id_shop, active) {
        try {


            const where = { id_shop }

            if (active !== undefined) {
                where.active = active === 'true'
            }
            const result = await UserRepository.listUsers({ where })
            return result
        } catch (error) {
            throw error;
        }


    }

    async listUserById(id_shop, id) {
        try {
            const result = await UserRepository.listUserById(id_shop, id)
            if (!result) {
                const error = new Error('El usuario con el id especificado no existe')
                error.status = 400
                throw error
            }
            return result

        } catch (error) {
            throw error
        }
    }

    async desactivateUser(id) {
        try {
            const result = await UserRepository.desactivateUser(id)
            const [filasAfectadas] = result
            if (filasAfectadas === 0) {
                return { message: "El usuario ya estaba desactivado" }
            }
            await redis.del(`user:${id}:token`, `user:${id}:refreshToken`)
            return { message: 'Estado del usuario desactivado correctamente' }

        } catch (error) {
            throw error
        }

    }

    async activateUser(id) {
        try {
            const result = await UserRepository.activateUser(id)
            const [filasAfectadas] = result
            if (filasAfectadas === 0) {
                return { message: "El usuario ya estaba activado" }
            }
            return { message: 'Estado del usuario activado correctamente' }

        } catch (error) {
            throw error
        }

    }
    async update(id, data) {
        try {
            const result = await UserRepository.update(id, data)
            return { User: result }
        } catch (error) {
            throw error
        }
    }
}