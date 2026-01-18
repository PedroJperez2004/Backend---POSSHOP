import { Router } from "express";
import { SaleItemController } from "../controllers/sale.items.controller.js";

import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'

export const salesItemsRouter = Router();
const saleItemController = new SaleItemController();


salesItemsRouter.get('/', authenticate, authorize('admin', 'employee'), (req, res) => {
    saleItemController.getAll(req, res);
})
