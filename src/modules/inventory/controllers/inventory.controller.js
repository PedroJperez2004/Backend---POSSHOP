import { InventoryService } from '../services/inventory.service.js'
import { ProductService } from '../../products/services/product.service.js'
export class InventoryController {
    constructor() {
        this.inventoryService = new InventoryService()
        this.productService = new ProductService()
    }

    async createMovement(req, res) {
        try {
            const { id_shop } = req.user
            const { product_id, quantity, type, note } = req.body
            const idProduct = await this.productService.listProductById(id_shop, product_id)
            const result = await this.inventoryService.createMovement(idProduct.id, quantity, type, note, id_shop)

            return res.status(201).json({ result: result })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }

    }
    async getMovements(req, res) {
        try {
            const { id_shop } = req.user
            const { type } = req.query
            const result = await this.inventoryService.listMovements(id_shop, type)
            return res.status(200).json({ result: result })
        } catch (error) {
            return res.status(500).json({ message: error.message })

        }
    }
    async getMovementById(req, res) {
        try {
            const { id_shop } = req.user
            const { id } = req.params
            const result = await this.inventoryService.listMovementById(id_shop, id)
            return res.status(200).json({
                movement: result
            })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })

        }
    }
    async getMovementByProduct(req, res) {
        try {
            const { id_shop } = req.user
            const { id } = req.params
            const result = await this.productService.listProductById(id_shop, id)
            const movements = await this.inventoryService.getMovementByProduct(id_shop, result.id)
            return res.status(200).json({
                movements: movements
            })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }
    }
  

}