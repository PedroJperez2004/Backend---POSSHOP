import models from "../../index.js"
import sequelize from "../../../config/database.js";
import { Op } from "sequelize";
export class InventoryRepository {

    static incrementInventory = async (product_id, quantity, type, note, id_shop, transaction = null) => {
        let localTransaction = false;
        try {
            if (!transaction) {
                transaction = await sequelize.transaction()
                localTransaction = true

            }
            // 1️⃣ Incrementar stock
            await models.Product.increment(
                'stock',
                {
                    by: quantity,
                    where: { id: product_id, id_shop },
                    transaction  //Usamos la transacción creada para agregar esta quiery a la misma sesión
                }
            );

            // 2️⃣ Registrar movimiento
            const inventory = await models.Inventory.create({
                product_id, quantity, type, note, id_shop
            }, { transaction }); //Usamos la transacción creada para agregar esta quiery a la misma sesión

            if (localTransaction) {
                await transaction.commit();
            }

            return inventory;

        } catch (error) {
            if (localTransaction) {
                await transaction.rollback();
            } //Si hay un error, deshacemos todas las operaciones realizadas en la transacción
            throw new Error('Error al incrementar el inventario: ' + error.message);
        }
    };


    static decrementInventory = async (product_id, quantity, type, note, id_shop, transaction = null) => {
        let localTransaction = false;

        try {
            if (!transaction) {
                transaction = await sequelize.transaction();
                localTransaction = true; // sabemos que somos dueños de esta transacción
            }

            // 1️⃣ Decrementar stock
            const affected = await models.Product.decrement(
                'stock',
                {
                    by: quantity,
                    where: {
                        id: product_id,
                        id_shop,
                        stock: { [Op.gte]: quantity }
                    },
                    transaction
                }
            );
            const [[, affectedRows]] = affected;
            if (affectedRows === 0) {
                throw new Error('Stock insuficiente');
            }

            // 2️⃣ Registrar movimiento
            const inventory = await models.Inventory.create(
                { product_id, quantity, type, note, id_shop },
                { transaction }
            );

            // 3️⃣ Commit solo si creamos la transacción aquí
            if (localTransaction) {
                await transaction.commit();
            }

            return inventory;

        } catch (error) {
            if (localTransaction) {
                await transaction.rollback();
            }
            throw new Error('Error al decrementar el inventario: ' + error.message);
        }
    };


    static listMovements = async (where) => {

        try {
            return await models.Inventory.findAll(where)
        } catch (error) {
            throw new Error('Error al obtener los movimientos de inventario: ' + error.message);
        }

    }

    static listMovementById = async (id_shop, id) => {
        try {
            return await models.Inventory.findOne({
                where: {
                    id: id,
                    id_shop: id_shop
                }
            })
        } catch (error) {

            throw new Error('Error al obtener el movimiento de inventario: ' + error.message);
        }

    }
    static listMovementByProduct = async (id_shop, product_id) => {
        try {
            return await models.Inventory.findAll({
                where: {
                    id_shop: id_shop,
                    product_id: product_id
                }
            })
        } catch (error) {

        }
    }
}