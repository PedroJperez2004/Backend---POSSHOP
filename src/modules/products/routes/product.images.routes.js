
import Router from "express";
import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'
import { uploadFile } from "../../../middlewares/uploads/upload.middleware.js";
import { ProductImagesController } from "../controllers/product.images.controller.js";

export const productImagesRoutes = Router()

const productImagesController = new ProductImagesController()

productImagesRoutes.patch('/:id', uploadFile('products').array('images'), authenticate, authorize('admin'),
    (req, res) => {
        productImagesController.actionsImages(req, res);
    }
);
