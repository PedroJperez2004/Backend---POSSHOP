import { Router } from "express";
import { SaleItemController } from "../controllers/sale.items.controller.js";

import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'

export const salesItemsRouter = Router();
const saleItemController = new SaleItemController();


salesItemsRouter.get('/', authenticate, authorize('admin', 'employee'), (req, res) => {
    saleItemController.getAll(req, res);
})
salesItemsRouter.get('/:productId/sales-items-by-product', authenticate, authorize('employee', 'admin'), (req, res) => {
    saleItemController.getSalesItemsByProduct(req, res)

})

salesItemsRouter.get('/:saleId/items', authenticate, authorize('employee', 'admin'), (req, res) => {
    saleItemController.getSaleItemsBySaleId(req, res)

})