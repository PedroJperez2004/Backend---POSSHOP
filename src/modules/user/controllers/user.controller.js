import { UserService } from '../services/user.services.js'
import redis from '../../../config/redis.client.js';
export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async login(req, res) {
        try {
            const result = await this.userService.loginUser(req.body)

            res.cookie('access_token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 1000 * 60 * 60

            })

            res.cookie('refresh_token', result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7d
            })

            return res.status(200).json({
                ok: true,
                user: result.user
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                message: error.message || 'Error interno'
            })
        }
    }


    async logout(req, res) {
        try {
            await redis.del(`user:${req.user.id}:token`,
                `user:${req.user.id}:refreshToken`

            )
            await res.clearCookie('access_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
                maxAge: 1000 * 60 * 60

            }).json({ message: 'Sesion cerrada' })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async register(req, res) {
        try {
            req.body = {
                ...req.body,
                id_shop: req.user.id_shop
            }

            const result = await this.userService.register(req.body)

            return res.status(201).json({
                ok: true,
                message: result.message
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                message: error.message || 'Error interno'
            })
        }
    }

    async listUsers(req, res) {
        try {
            const { active } = req.query
            const id_shop = req.user.id_shop
            const result = await this.userService.listUsers(id_shop, active)
            return res.status(200).json({ Users: result })
        } catch (error) {
            return res.status(500).json({ message: error.message })

        }
    }

    async listUsersById(req, res) {
        try {
            const id_shop = req.user.id_shop
            const { id } = req.params
            const result = await this.userService.listUserById(id_shop, id)
            return res.status(200).json({
                user: result
            })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }
    }

    async desactivateUser(req, res) {
        try {
            const { id } = req.params
            const id_shop = req.user.id_shop

            // 1️⃣ Verificar usuario
            const user = await this.userService.listUserById(id_shop, id)

            // 2️⃣ Desactivar usuario
            const result = await this.userService.desactivateUser(user.id)

            // 4️⃣ Responder UNA vez
            return res.status(200).json({
                message: 'Usuario desactivado y sesión cerrada',
                result
            })

        } catch (error) {
            return res
                .status(error.status || 500)
                .json({ message: error.message })
        }
    }

    async activateUser(req, res) {  //Esto es de activacion de user
        try {
            const id_shop = req.user.id_shop
            const { id } = req.params

            const users = await this.userService.listUserById(id_shop, id)
            const result = await this.userService.activateUser(users.id)

            return res.status(200).json({
                result: result
            })


        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })

        }
    }
    async update(req, res) {
        try {
            const { id_shop } = req.user
            const { id } = req.params
            const data = {
                ...req.body
            }

            const user = await this.userService.listUserById(id_shop, id)
            const result = await this.userService.update(user.id, data)
            return res.status(200).json({
                ok: true,
                message: result
            })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }

    }



}


