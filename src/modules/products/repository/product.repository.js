import models from "../../index.js"
import { Op } from "sequelize";
export class ProductRepository {

    static create = async (data, url) => {
        try {
            const { name, description, price, stock, id_category, alt_text, id_shop, id_tax } = data

            const productCreated = await models.Product.create({
                name, description, price, stock, id_category, id_shop, id_tax
            })
            const imagesToCreate = url.map((img, index) => ({
                product_id: productCreated.id,
                id_shop: productCreated.id_shop,
                url: img,
                alt_text: alt_text,
                order: index + 1,
                isMain: index === 0

            }))
            await models.ProductImage.bulkCreate(imagesToCreate)

            const productWithImages = await models.Product.findByPk(productCreated.id, {
                include: 'images'
            });

            return productWithImages;
        } catch (error) {

            throw new Error(error.message)

        }
    };

    static updateProduct = async (id_shop, id, data) => {
        try {
            return await models.Product.update(data, {
                where: {
                    id,
                    id_shop
                }
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
    static desactivateProduct = async (id_shop, id) => {
        try {

            return await models.Product.update(
                { active: false },
                {
                    where: {
                        id: id,
                        active: {
                            [Op.ne]: false
                        },
                        id_shop: id_shop
                    }
                }


            )
        } catch (error) {
            throw new Error(error.message)

        }
    }
    static activateProduct = async (id_shop, id) => {
        try {

            return await models.Product.update(
                { active: true },
                {
                    where: {
                        id: id,
                        active: {
                            [Op.ne]: true
                        },
                        id_shop: id_shop
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
    static searchProductIds = async (id_shop, ids, transaction = null) => {
        try {

            return await models.Product.findAll({
                where: {
                    id: {
                        [Op.in]: ids,
                    },
                    id_shop: id_shop,
                },
                transaction: transaction || undefined  //TRANSACTION
            })
        } catch (error) {
            return { message: error.message }
        }
    }


    static updateImage = async (id_shop, id, url) => {
        try {
            return await models.ProductImage.update({
                url: url[0],
                isMain: true,
                order: 1
            }, {
                where: {
                    product_id: id,
                    id_shop: id_shop
                }
            })
        } catch (error) {
            throw new Error(error.message)

        }
    }

    static createImage = async (id_shop, id, url) => {
        try {
            return await models.ProductImage.create({
                id_shop: id_shop,
                product_id: id,
                url: url[0],
                isMain: true,
                order: 1
            })

        } catch (error) {
            throw new Error(error.message)

        }
    }

    static getProductImages = async (id_shop, id) => {
        try {

            return await models.ProductImage.findAll({
                where: {
                    product_id: id,
                    id_shop: id_shop
                },
                attributes: ['url']
            })

        } catch (error) {
            throw new Error
        }
    }

    static listProductsByTax = async (id_shop, id_tax) => {
        try {
            return await models.Product.findAll({
                where: {
                    id_shop: id_shop,
                    id_tax: id_tax
                }
            })
        } catch (error) {
            throw new Error('Error al obtener los productos de la categoría: ', error.message)
        }
    }

}