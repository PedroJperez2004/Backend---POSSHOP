import { ProductImagesService } from "../services/product.images.service.js";
import { ProductService } from "../services/product.service.js"
import { saveImages } from "../../../utils/saveImages.js"
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
            const images = await saveImages(req.files, 'products');
            console.log('IMAGESS: ', images)
            const product = await this.productService.listProductById(id_shop, id)
            console.log('PRODUCT: ', product)

            if (!product) {
                throw new Error('Producto no encontrado')
            }

            await this.productImagesService.actionsImages(id_shop, product.id, images, imagesToDelete)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })

        }



    }

}