import { Router } from 'express'
import { InventoryController } from '../controllers/inventory.controller.js'
import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'
import { inventorySchema } from '../../../middlewares/validation/inventory.schema.js'

export const inventoryRoutes = Router()

const inventoryController = new InventoryController()


// Crear movimiento (entrada o salida)
inventoryRoutes.post('/movements', authenticate, authorize('admin', 'employee'), validate(inventorySchema), (req, res) => {
    inventoryController.createMovement(req, res)
})

// Listar movimientos
inventoryRoutes.get('/movements', authenticate, authorize('admin', 'employee'), (req, res) => {
    inventoryController.getMovements(req, res)
});

// Obtener movimiento por id
inventoryRoutes.get('/movements/:id', authenticate, authorize('admin', 'employee'), (req, res) => {
    inventoryController.getMovementById(req, res)
});

inventoryRoutes.get('/products/:id/movements', authenticate, authorize('admin', 'employee'), (req, res) => {
    inventoryController.getMovementByProduct(req, res)
})
