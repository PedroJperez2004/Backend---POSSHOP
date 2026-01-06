import models from "../../index.js"
import { Op, where } from "sequelize";
export class ProductRepository {

    static create = async (data, url) => {
        try {
            const { name, description, price, stock, id_category, alt_text, id_shop } = data
            console.log('URL: ', url)
            const productCreated = await models.Product.create({
                name: name, description: description, price: price, stock: stock, id_category: id_category, id_shop: id_shop
            })
            const imagesToCreate = url.map(img => ({
                product_id: productCreated.id,
                url: img,
                alt_text: alt_text

            }))
            console.log(imagesToCreate)
            await models.ProductImage.bulkCreate(imagesToCreate)
            const productWithImages = await models.Product.findByPk(productCreated.id, {
                include: 'images'
            });
            return productWithImages;


        } catch (error) {
            throw new Error(error.message)

        }
    };

    static updateProduct = async (id, data) => {
        try {
            return await models.Product.update(data, {
                where: { id }
            });

        } catch (error) {
            return
        }
    }


    static listProductsByCategory = async (id_shop, id_category) => {
        try {
            return await models.Product.findAll({
                where: {
                    id_shop: id_shop,
                    id_category: id_category
                }
            })
        } catch (error) {
            throw new Error('Error al obtener los productos de la categoría: ', error.message)
        }
    }
    static listProducts = async (where) => {
        try {
            return await models.Product.findAll({
                where,
                include: 'images'
            })
        } catch (error) {
            throw new Error('Error al obtener los productos: ', error.message)
        }

    }
    static chekProductsExistence = async (id_shop, ids_products) => {
        const products = await models.Product.findAll({
            where: {
                id: {
                    [Op.in]: ids_products,
                },
                id_shop: id_shop,
            },
            attributes: ['id'],
            raw: true,
        });

        return products


    };

    static updateCategoryProducts = async (id_shop, id_category, ids_products) => {
        try {
            await models.Product.update(
                { id_category },
                {
                    where: {
                        id: { [Op.in]: ids_products },
                        id_shop,
                    },
                }
            )

            const result = await models.Product.findAll({
                where: {
                    id: { [Op.in]: ids_products },
                    id_shop
                }
            })

            return result
        } catch (error) {
            throw new Error('Error al actualizar la categoría de los productos: ', error.message)
        }
    }

    static async listProductById(id_shop, id) {
        try {
            console
            const result = await models.Product.findOne({
                where: {
                    id_shop,
                    id
                },
                include: 'images'
            })
            return result

        } catch (error) {
            throw new Error('Error al obtener el producto: ', error.message)

        }

    }
    static desactivateProduct = async (id) => {
        try {

            return await models.Product.update(
                { active: false },
                {
                    where: {
                        id: id,
                        active: {
                            [Op.ne]: false
                        }
                    }
                }


            )
        } catch (error) {
            throw new Error(error.message)

        }
    }
    static activateProduct = async (id) => {
        try {

            return await models.Product.update(
                { active: true },
                {
                    where: {
                        id: id,
                        active: {
                            [Op.ne]: true
                        }
                    }
                }


            )
        } catch (error) {
            throw new Error(error.message)

        }
    }

    static deleteProduct = async (id_shop, id) => {
        try {
            const ProductImages = await models.ProductImage.findAll({
                where: { product_id: id },
                attributes: ['url']
            });
            await models.Product.destroy({
                where: {
                    id: id,
                    id_shop: id_shop,
                }
            })
            return ProductImages.map(img => img.url);
        } catch (error) {
            throw new Error('Error al eliminar el producto', error.message)
        }
    }
}