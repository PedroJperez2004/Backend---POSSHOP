import models from '../../index.js'

export class SaleItemRepository {

    static create = async (data, transaction = null) => {
        try {

            return await models.SaleItem.bulkCreate(data, { transaction: transaction || undefined })

        } catch (error) {
            throw new Error('Error al crear los items de la venta: ' + error)
        }

    }
    static searchSalesDetailById = async (id, id_shop, transaction = null) => {


        return await models.SaleItem.findAll({
            where: {
                sale_id: id,
                id_shop
            }, transaction: transaction || undefined

        })

    }
    static getAll = async (id_shop) => {
        try {
            return await models.SaleItem.findAll({
                where: {
                    id_shop
                },
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            throw new Error('Error al obtener los items de las ventas: ' + error.message);
        }

    }



}