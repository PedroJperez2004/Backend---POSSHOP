import models from '../../index.js'
import { Op } from 'sequelize'
export class CategoryRepository {
    static createCategory = async (name, description, id_shop, active) => {
        try {
            return await models.Category.create({ name, description, id_shop, active })
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`)
        }


    }
    static listCategory = async ({ where }) => {
        try {
            return await models.Category.findAll({
                where
            })

        } catch (errr) {
            throw new Error('Error al obtener las categorias')
        }

    }

    static listCategoryById = async (id_shop, id) => {
        try {
            const result = await models.Category.findOne({
                where: {
                    id: id,
                    id_shop: id_shop,
                }
            })

            return result



        } catch (error) {
            throw new Error('Error al obtener la categoría')

        }

    }
    static updateCategory = async (id, data) => {

        try {
            await models.Category.update(
                data
                , {
                    where: {
                        id: id
                    }

                })
            return await models.Category.findByPk(id)

        } catch (error) {
            throw new Error('Error al actualizar el usuario')

        }
    }

    static desactivateCategory = async (id) => {
        try {

            return await models.Category.update(
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
            throw new Error(error.message)

        }
    }
    static activateCategory = async (id) => {
        try {
            console.log(id)
            console.log(typeof id)

            return await models.Category.update(
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
            throw new Error(error.message)

        }
    }
}