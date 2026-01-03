import Router from "express";
import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'
import { categorySchema } from "../../../middlewares/validation/category.schema.js";
import { CategoryController } from "../controllers/category.controller.js";
export const categoryRoutes = Router()

const categoryController = new CategoryController()

categoryRoutes.get('/', (req, res) => {
    res.send('Hola desde las categorias')
})

categoryRoutes.post('/create-categories', authenticate, authorize('admin'), validate(categorySchema), (req, res) => {
    categoryController.createCategory(req, res)
})
categoryRoutes.get('/list-categories', authenticate, authorize('admin', 'employee'), (req, res) => {
    categoryController.listCategory(req, res)
})
categoryRoutes.get('/list-categories/:id', authenticate, authorize('admin', 'employee'), (req, res) => {
    categoryController.listCategoryById(req, res)
})
categoryRoutes.patch('/:id/update-categories', authenticate, authorize('admin'), validatePartial(categorySchema), (req, res) => {
    categoryController.updateCategory(req, res)
})
categoryRoutes.patch('/:id/desactivate', authenticate, authorize('admin'), (req, res) => {
    categoryController.desactivateCategory(req, res)
})
categoryRoutes.patch('/:id/activate', authenticate, authorize('admin'), (req, res) => {
    categoryController.activateCategory(req, res)
})