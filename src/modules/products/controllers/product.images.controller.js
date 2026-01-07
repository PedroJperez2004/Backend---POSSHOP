import { ProductImagesService } from "../services/product.images.service.js";
import { ProductService } from "../services/product.service.js"

export class ProductImagesController {
    constructor() {
        this.productImagesService = new ProductImagesService()
        this.productService = new ProductService()
    }


    async actionsImages(req, res) {
        try {
            const { id_shop } = req.user
            const { id } = req.params
            const { imagesToDelete } = req.body
            const product = await this.productService.listProductById(id_shop, id)
            if (!product) {
                throw new Error('Producto no encontrado')
            }

            await this.productImagesService.actionsImages(id_shop, product.id, req.files, imagesToDelete)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })

        }



    }

}