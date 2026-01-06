
import models from "../../index.js"
import sequelize from "../../../config/database.js";
import { Op, where } from "sequelize";
export class InventoryRepository {

    static incrementInventory = async (product_id, quantity, type, note, id_shop) => {
        const transaction = await sequelize.transaction(); //Iniciamos las queries en una transacción

        try {
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

            await transaction.commit(); //Si todo sale bien, confirmamos las operaciones
            return inventory;

        } catch (error) {
            await transaction.rollback(); //Si hay un error, deshacemos todas las operaciones realizadas en la transacción
            throw new Error('Error al incrementar el inventario: ' + error.message);
        }
    };


    static decrementInventory = async (product_id, quantity, type, note, id_shop) => {
        const transaction = await sequelize.transaction();  //Iniciamos las queries en una transacción

        try {
            // 1️⃣ Decrementar solo si hay stock suficiente
            const affected = await models.Product.decrement(
                'stock',
                {
                    by: quantity,
                    where: {
                        id: product_id,
                        id_shop,
                        stock: { [Op.gte]: quantity }
                    },
                    transaction //Usamos la transacción creada para agregar esta quiery a la misma sesión
                }
            );
            const [[, affectedRows]] = affected;  //SOLO Obtener el número de filas afectadas, se coloca de esta forma debido a la estructura del resultado devuelto por Sequelize, que es un array anidado, y que no es igual que en postgresql
            if (affectedRows === 0) {
                throw new Error('Stock insuficiente');
            }

            // 2️⃣ Registrar movimiento
            const inventory = await models.Inventory.create({
                product_id, quantity, type, note, id_shop
            }, { transaction });  //Usamos la transacción creada para agregar esta quiery a la misma sesión


            await transaction.commit();  //Si todo sale bien, confirmamos las operaciones
            return inventory;

        } catch (error) {
            await transaction.rollback();  //Si hay un error, deshacemos todas las operaciones realizadas en la transacción
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