import models from "../../index.js"
import { Op } from "sequelize";

export class TaxRepository {
    static async createTax(id_shop, name, percentage, type, included_in_price, is_active) {
        try {
            return await models.Tax.create({
                id_shop,
                name,
                percentage,
                type,
                included_in_price,
                is_active
            });
        } catch (error) {
            throw new Error('Error creating tax: ' + error.message);

        }
    }

    static async listTaxes(id_shop) {
        try {
            return await models.Tax.findAll({
                where: { id_shop }
            })
        } catch (error) {
            throw new Error('Error listing taxes: ' + error.message);
        }
    }

    static async listTaxesById(id_shop, id, transaction = null) {
        try {
            return await models.Tax.findOne({
                where: { id_shop, id },
                transaction: transaction || undefined
            })
        } catch (error) {
            throw new Error('Error listing tax by ID: ' + error.message);
        }
    }
    static desactivateTax = async (id_shop, id) => {
        try {

            return await models.Tax.update(
                { is_active: false },
                {
                    where: {
                        id: id,
                        is_active: {
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
    static activateTax = async (id_shop, id) => {
        try {

            return await models.Tax.update(
                { is_active: true },
                {
                    where: {
                        id: id,
                        is_active: {
                            [Op.ne]: true
                        },
                        id_shop: id_shop
                    }
                }


            )
        } catch (error) {
            throw new Error(error.message)

        }
    }
    static delete = async (id_shop, id) => {

        try {
            return await models.Tax.destroy({
                where: {
                    id: id,
                    id_shop: id_shop
                }
            })
        } catch (error) {
            throw new Error(error.message)

        }
    }
    static update = async (id_shop, id, data) => {

        try {
            return await models.Tax.update(
                data, {
                where: {
                    id: id,
                    id_shop: id_shop
                }
            }
            )
        } catch (error) {
            throw new Error(error.message)

        }
    }
}