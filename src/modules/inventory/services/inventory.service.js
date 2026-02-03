import { InventoryRepository } from '../repository/inventory.repository.js'
export class InventoryService {
    async createMovement(user_id, product_id, quantity, type, note, id_shop, transaction = null) {
        {
            try {
                if (quantity <= 0) {
                    throw new Error('La cantidad debe ser mayor a 0');
                }
                if (type !== 'in' && type !== 'out') {
                    const error = new Error()
                    error.status = 400
                    error.message = 'Tipo de movimiento inválido'
                    throw error
                }
                if (type === 'in') {
                    const result = await InventoryRepository.incrementInventory(user_id, product_id, quantity, type, note, id_shop, transaction)
                    return { message: 'Movimiento de entrada registrado', movement: result }
                }
                if (type === 'out') {
                    const result = await InventoryRepository.decrementInventory(user_id, product_id, quantity, type, note, id_shop, transaction)
                    return { message: 'Movimiento de salida registrado', movement: result }
                }

            } catch (error) {
                throw error
            }
        }
    }

    async listMovements(id_shop, type) {
        try {
            const where = { id_shop }
            if (type !== undefined) {
                where.type = type
            }
            const result = await InventoryRepository.listMovements({ where })
            return { message: 'Movimientos obtenidos', Movements: result }
        } catch (error) {
            throw error
        }

    }
    async listMovementById(id_shop, id) {
        try {
            const result = await InventoryRepository.listMovementById(id_shop, id)
            if (!result) {
                const error = new Error('El movimiento no existe')
                error.status = 400
                throw error
            }
            return result

        } catch (error) {
            throw error
        }
    }
    async getMovementByProduct(id_shop, product_id) {
        try {
            const result = await InventoryRepository.listMovementByProduct(id_shop, product_id)
            return result
        } catch (error) {
            throw error
        }

    }
}