import { Router } from "express";
import { SaleController } from "../controllers/sale.controller.js";
import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'

export const salesRouter = Router();
const saleController = new SaleController();


salesRouter.post('/', authenticate, authorize('admin', 'employee'), (req, res) => {
    saleController.create(req, res);

})

salesRouter.post('/:id/reverse', authenticate, authorize('admin', 'employee'), (req, res) => {
    saleController.reverse(req, res)
})

salesRouter.get('/list', authenticate, authorize('admin', 'employee'), (req, res) => {
    saleController.getAll(req, res)

})

salesRouter.get('/:employeeId/list', authenticate, authorize('employee', 'admin'), (req, res) => {
    saleController.getEmployeeSales(req, res)

})


