import Router from "express";
import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'
import { categorySchema } from "../../../middlewares/validation/category.schema.js";
import { CategoryController } from "../controllers/category.controller.js";
export const categoryRoutes = Router()

const categoryController = new CategoryController()

categoryRoutes.post('/', authenticate, authorize('admin'), validate(categorySchema), (req, res) => {
    categoryController.createCategory(req, res)
})
categoryRoutes.get('/', authenticate, authorize('admin', 'employee'), (req, res) => {
    categoryController.listCategory(req, res)
})
categoryRoutes.get('/:id', authenticate, authorize('admin', 'employee'), (req, res) => {
    categoryController.listCategoryById(req, res)
})
categoryRoutes.patch('/:id', authenticate, authorize('admin'), validatePartial(categorySchema), (req, res) => {
    categoryController.updateCategory(req, res)
})
categoryRoutes.patch('/:id/desactivate', authenticate, authorize('admin'), (req, res) => {
    categoryController.desactivateCategory(req, res)
})
categoryRoutes.patch('/:id/activate', authenticate, authorize('admin'), (req, res) => {
    categoryController.activateCategory(req, res)
})