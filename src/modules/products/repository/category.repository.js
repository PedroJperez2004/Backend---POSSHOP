import models from '../../index.js'
import { Op } from 'sequelize'

export class CategoryRepository {
    constructor() {
        this.productService = new ProductService()
    }

    static createCategory = async (name, description, id_shop, active) => {

        try {
            return await models.Category.create({ name, description, id_shop, active })
        } catch (error) {
           
            throw new Error(`Error al crear la categoría: ${error.message}`)
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
            throw error
        }

    }
    static updateCategory = async (id_shop, id, data) => {
        try {
            await models.Category.update(
                data
                , {
                    where: {
                        id: id
                    },
                    id_shop: id_shop

                })
            return await models.Category.findByPk(id)

        } catch (error) {
            throw new Error('Error al actualizar el usuario')

        }
    }

    static desactivateCategory = async (id_shop, id) => {
        try {

            return await models.Category.update(
                { active: false },
                {
                    where: {
                        id: id,
                        active: {
                            [Op.ne]: false
                        },
                        id_shop: id_shop
                    }
                }


            )
        } catch (error) {
            throw new Error(error.message)

        }
    }
    static activateCategory = async (id_shop, id) => {
        try {
         

            return await models.Category.update(
                { active: true },
                {
                    where: {
                        id: id,
                        active: {
                            [Op.ne]: true
                        }, id_shop: id_shop
                    }
                }


            )
        } catch (error) {
            throw new Error(error.message)

        }
    }

    static delete = async (id_shop, id) => {

        try {
            return await models.Category.destroy({
                where: {
                    id: id,
                    id_shop: id_shop
                }
            })
        } catch (error) {
            throw new Error(error.message)

        }
    }


}