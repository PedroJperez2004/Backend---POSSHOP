
import Router from "express";
import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'
import { productSchema } from "../../../middlewares/validation/product.schema.js";
import { uploadFile } from "../../../config/multer.config.js";
import { ProductImagesController } from "../controllers/product.images.controller.js";
import { updateCategoryProductsSchema } from "../../../middlewares/validation/product.update.category.schema.js";

export const productImagesRoutes = Router()

const productImagesController = new ProductImagesController()

productImagesRoutes.get('/', (req, res) => {
    res.send('Hola mundo')

})