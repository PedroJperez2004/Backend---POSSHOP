import { ProductImagesService } from "../services/product.images.service.js";
export class ProductImagesController {
    constructor() {
        this.productImagesService = new ProductImagesService();
    }

}