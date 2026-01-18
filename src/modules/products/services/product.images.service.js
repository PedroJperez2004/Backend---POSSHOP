import { deleteImages } from "../../../utils/deleteImages.js";
import { ProductImagesRepository } from "../repository/product.images.repository.js";


export class ProductImagesService {

    async actionsImages(id_shop, product_id, url, images) {
        try {
            // const filesArray = Object.values(files).filter(file => file && file.filename);

            // const url = filesArray.map(file => `/storage/uploads/products/${file.filename}`);

            const imagesToDelete = JSON.parse(images)
            console.log('URL:', url)
            console.log('IMAGESTODELETE: ', imagesToDelete)
            if (url.length > 0 && imagesToDelete.length > 0) {
                const result = await ProductImagesRepository.imagesDeleteAndUpdate(id_shop, product_id, url, imagesToDelete)
                const urls = result.imagesToRemove.map(img => img.dataValues.url);

                console.log(urls);
                deleteImages(urls)

                return result
            }


        } catch (error) {
            throw error
        }
    }


}