import models from "../../index.js"
import { Op } from "sequelize"
export class ProductImagesRepository {
    static imagesDeleteAndUpdate = async (id_shop, product_id, url, imagesToDelete) => {
        try {
            const imagesToRemove = await models.ProductImage.findAll({
                where: {
                    id: { [Op.in]: imagesToDelete },
                    product_id,

                }
            });

            // 2️⃣ Borrar las imágenes
            await models.ProductImage.destroy({
                where: {
                    id: { [Op.in]: imagesToDelete },
                    product_id
                }
            });

            const imagesToCreate = url.map((img, index) => ({
                product_id,
                url: img,
                alt_text: imagesToRemove[index]?.alt_text || '', // mantiene alt_text de la imagen eliminada
                order: imagesToRemove[index]?.order || (index + 1), // usa el mismo order que tenía la imagen eliminada
                isMain: index === 0
            }));

            await models.ProductImage.bulkCreate(imagesToCreate)
            return { message: 'Imagenes actualizadas correctamente', imagesToRemove }

        } catch (error) {
            throw new Error(error.message)


        }

    }
}