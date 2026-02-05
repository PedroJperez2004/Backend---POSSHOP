import models from "../../index.js"
import sequelize from "../../../config/database.js"
import { Op, where } from "sequelize"
export class SaleRepository {


    static create = async (user_id, sale_number, payment_method, id_shop, transaction = null, reverse_sale_id = null) => {
        try {
            if (reverse_sale_id != null && reverse_sale_id != undefined) {
                return await models.Sale.create({ user_id, sale_number, payment_method, id_shop, reverse_sale_id, transaction: transaction || undefined })
            }
            return await models.Sale.create({ user_id, sale_number, payment_method, id_shop, transaction: transaction || undefined })
        }
        catch (error) {
            throw new Error('Error al crear la venta: ' + error.message)

        }

    }
    static updateSaleforItems = async (id, total, status, id_shop, transaction = null) => {
        try {
            await models.Sale.update(
                { total, status },
                {
                    where: {
                        id,
                        id_shop
                    },
                    transaction: transaction || undefined
                }

            )
            return this.searchSaleById(id, id_shop, transaction)

        } catch (error) {
            throw new Error('Error al actualizar la venta: ' + error.message)
        }

    }
    static searchSaleById = async (id, id_shop, transaction = null) => {

        try {

            return await models.Sale.findOne({
                where: {
                    id,
                    id_shop
                },
                transaction: transaction || undefined
            });
        } catch (error) {

            throw new Error('Error al obtener la venta: ' + error.message)

        }
    }



    static createReverseSale = async (user_id, sale_number, payment_method, id_shop, reverse_sale_id, transaction = null) => {
        try {
            return await models.Sale.create(
                { user_id, sale_number, payment_method, id_shop, reverse_sale_id },
                { transaction: transaction || undefined }
            )


        }
        catch (error) {
            throw new Error('Error al crear la venta: ' + error.message)

        }

    }
    static exisReverseSale = async (reverse_sale_id, id_shop, transaction) => {
        try {
            return await models.Sale.findOne({
                where: {
                    reverse_sale_id,
                    id_shop
                },
                transaction: transaction || undefined
            })
        } catch (error) {
            throw new Error('Error al comproba la venta reversa: ' + error.message)

        }
    }

    static getAll = async (data) => {
        try {
            const where = {
                id_shop: data.id_shop
            };

            if (data.status) {
                where.status = data.status;
            }

            if (data.from && data.to) {
                where.createdAt = {
                    [Op.between]: [
                        new Date(data.from),
                        new Date(data.to + 'T23:59:59.999')
                    ]
                };
            }

            return await models.Sale.findAll({
                where,
                order: [['createdAt', 'DESC']]
            });
        } catch (error) {
            throw new Error('Error al obtener todas las ventas: ' + error.message);
        }
    };
    static getEmployeeSales = async (employeeId, id_shop) => {
        try {
            const sales = await models.Sale.findAll({
                where: {
                    user_id: employeeId,
                    id_shop
                },
                order: [['createdAt', 'DESC']]
            });
            return sales;
        } catch (error) {
            throw new Error('Error al obtener las ventas del empleado: ' + error.message);
        }
    }

    static getProductSales = async (employeeId, id_shop) => {
        try {
            const sales = await models.Sale.findAll({
                where: {
                    user_id: employeeId,
                    id_shop
                },
                order: [['createdAt', 'DESC']]
            });
            return sales;
        } catch (error) {
            throw new Error('Error al obtener las ventas del empleado: ' + error.message);
        }
    }
}