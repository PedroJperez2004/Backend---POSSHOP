
import Router from "express";
import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'
import { TaxController } from "../controllers/tax.controller.js";
import { taxSchema } from "../../../middlewares/validation/tax.schema.js";

export const taxRoutes = Router()

const taxController = new TaxController()

taxRoutes.post('/', authenticate, authorize('admin'), validate(taxSchema), (req, res) => {
    taxController.createTax(req, res);
});

taxRoutes.get('/', authenticate, authorize('admin'), (req, res) => {
    taxController.listTaxes(req, res);
});

taxRoutes.get('/:id', authenticate, authorize('admin'), (req, res) => {
    taxController.listTaxesById(req, res);
});

taxRoutes.patch('/:id/desactivate', authenticate, authorize('admin'), (req, res) => {
    taxController.desactivateTax(req, res)
})

taxRoutes.patch('/:id/activate', authenticate, authorize('admin'), (req, res) => {
    taxController.activateTax(req, res)
})
taxRoutes.delete('/:id/delete', authenticate, authorize('admin'), (req, res) => {
    taxController.delete(req, res)
})
taxRoutes.patch('/:id/update', authenticate, authorize('admin'), validatePartial(taxSchema), (req, res) => {
    taxController.update(req, res)
})