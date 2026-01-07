
import Router from "express";
import { authenticate, authorize, validate, validatePartial } from '../../../middlewares/index.js'
import { uploadFile } from "../../../config/multer.config.js";
import { ProductImagesController } from "../controllers/product.images.controller.js";

export const productImagesRoutes = Router()

const productImagesController = new ProductImagesController()

productImagesRoutes.patch('/:id', authenticate, authorize('admin'), (req, res, next) => {
    uploadFile('products').array('images', 5)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Solo puede agregar un máximo de 5 imágenes' });
        }
        next();
    });
},
    (req, res) => {
        productImagesController.actionsImages(req, res);
    }
);
