import User from '../models/user.model.js'
import { Op } from 'sequelize'
import models from '../../index.js'

export class UserRepository {
    static findByEmail(email) {
        return User.findOne({ where: { email } })
    }

    static register = async (userName, firstName, lastName, email, phone, password, role, id_shop, active) => {
        try {
            return await models.User.create({ userName, firstName, lastName, email, phone, password, role, id_shop, active })
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`)
        }


    }

    static ifExistUsernameEmail = async (userName, email) => {
        try {
            const result = await User.findOne({
                where: {
                    [Op.or]: [
                        { userName },
                        { email }
                    ]
                }
            })
            return result




        } catch (error) {
            throw new Error('Error al verificar usuario')
        }
    }

    static listUsers = async ({ where }) => {
        try {
            return await models.User.findAll({
                where,
                attributes: { exclude: ['password'] }
            })

        } catch (errr) {
            throw new Error('Error al obtener los usuarios')
        }

    }

    static listUserById = async (id_shop, id) => {
        try {
            const result = await User.findOne({
                where: {
                    id: id,
                    id_shop: id_shop,
                }
            })

            return result



        } catch (error) {
            throw new Error('Error al obtener el usuario')

        }
    }
    static desactivateUser = async (id) => {
        try {
            return await User.update(
                { active: false },
                {
                    where: {
                        id: id,
                        active: {
                            [Op.ne]: false
                        }
                    }
                }


            )
        } catch (error) {
            throw new Error('Erro al actualizar el estado')

        }
    }
    static activateUser = async (id) => {
        try {
            return await User.update(
                { active: true },
                {
                    where: {
                        id: id,
                        active: {
                            [Op.ne]: true
                        }
                    }
                }


            )
        } catch (error) {
            throw new Error('Erro al actualizar el estado')

        }
    }
    static update = async (id, data) => {
        try {
            // Actualiza el usuario
            await User.update(data, {
                where: { id: id }
            });

            // Devuelve el usuario actualizado sin el password
            const updatedUser = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });

            return updatedUser;

        } catch (error) {
            console.error(error); // útil para debug
            throw new Error('Error al actualizar el usuario');
        }
    };


}