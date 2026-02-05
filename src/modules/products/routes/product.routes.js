
import Router from "express";
import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'
import { productSchema } from "../../../middlewares/validation/product.schema.js";
import { updateProductSchema } from "../../../middlewares/validation/update.product.shema.js";
import { uploadFile } from "../../../middlewares/uploads/upload.middleware.js";
import multer from 'multer';
import parser from '../../../config/multer.js';


import { ProductController } from "../controllers/product.controller.js";
import { updateCategoryProductsSchema } from "../../../middlewares/validation/product.update.category.schema.js";

export const productRoutes = Router()

const productController = new ProductController()

productRoutes.post(
    '/create',
    // Manejador de errores de Multer
    (req, res, next) => {
        parser.array('images')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                // Errores específicos de Multer (ej. archivo muy grande)
                return res.status(400).json({ error: `Error de carga: ${err.message}` });
            } else if (err) {
                // Error de nuestro fileFilter (ej. no es una imagen)
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    },
    authenticate,
    authorize('admin'),
    validate(productSchema),
    (req, res) => {
        productController.createProduct(req, res);
    }
);


productRoutes.get('/:id/list-products-by-category', authenticate, authorize('admin', 'employee'), (req, res) => {
    productController.listProductsByCategory(req, res)
})

productRoutes.get('/:id/list-products-by-tax', authenticate, authorize('admin', 'employee'), (req, res) => {
    productController.listProductsByTax(req, res)
})

productRoutes.get('/list-products', authenticate, authorize('admin', 'employee'), (req, res) => {
    productController.listProducts(req, res)
})

productRoutes.patch('/update-category-products', authenticate, authorize('admin'), validate(updateCategoryProductsSchema), (req, res) => {
    productController.updateCategoryProducts(req, res)
})

productRoutes.get('/list-products/:id', authenticate, authorize('admin', 'employee'), (req, res) => {
    productController.listProductById(req, res)
})

productRoutes.patch('/:id/desactivate', authenticate, authorize('admin'), (req, res) => {
    productController.desactivateProduct(req, res)
})

productRoutes.patch('/:id/activate', authenticate, authorize('admin'), (req, res) => {
    productController.activateProduct(req, res)
})

productRoutes.delete('/:id/delete', authenticate, authorize('admin'), (req, res) => {
    productController.deleteProduct(req, res)
})

productRoutes.patch('/:id/update',
    // Manejador de errores de Multer
    (req, res, next) => {
        parser.array('images')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                // Errores específicos de Multer (ej. archivo muy grande)
                return res.status(400).json({ error: `Error de carga: ${err.message}` });
            } else if (err) {
                // Error de nuestro fileFilter (ej. no es una imagen)
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    },
    authenticate,
    authorize('admin'),
    validatePartial(updateProductSchema),
    (req, res) => {
        productController.updateProduct(req, res);
    }
);