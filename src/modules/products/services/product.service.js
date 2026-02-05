import { ProductRepository } from "../repository/product.repository.js"
import { SaleItemRepository } from "../../sales/repository/sale.item.repository.js";
import { CategoryRepository } from "../repository/category.repository.js";
import { deleteImages } from "../../../utils/deleteImages.js";
import { TaxService } from "./tax.service.js";
import { saveImages } from "../../../utils/saveImages.js";
import { InventoryService } from "../../inventory/services/inventory.service.js";
import { deleteImagesToCloudinary } from "../../../utils/deleteToCloudinary.js";

import { uploadToCloudinary } from "../../../utils/uploadToCloudinary.js";

export class ProductService {

    constructor() {
        this.taxService = new TaxService()
        this.inventoryService = new InventoryService()

    }


    async create(files, body, id_shop, user_id) {
        try {
            const category = await CategoryRepository.listCategoryById(id_shop, body.id_category)
            if (category.active !== true) {
                throw new Error('Categoría inactiva, seleccione otra')
            }
            if (!files || files.length === 0) {
                throw new Error('Debe agregar al menos una imagen ')
            }
            if (files.length > 1) {
                throw new Error('Máximo 1 imagen')
            }


            let images = [];

            if (process.env.NODE_ENV === 'production') {

                for (const file of files) {
                    const url = await uploadToCloudinary(file, 'products');
                    images.push(url);
                }
            } else {

                images = await saveImages(files, 'products');
            }





            if (!body.stock || body.stock <= 0) {
                body.stock = 0
            }
            const data = {
                ...body, id_shop: id_shop, id_category: category.id
            }

            const dataFiles = {
                images, alt_text: body.alt_text
            }



            await this.taxService.listTaxesById(id_shop, data.id_tax)
            const result = await ProductRepository.create(data, dataFiles.images)

            if (result.dataValues.stock > 0) {
                const { id, stock, name } = result.dataValues
                const product_id = id
                const quantity = stock
                const type = `in`
                const note = `Creacion del producto ${name}`
                await this.inventoryService.createMovement(user_id, product_id, quantity, type, note, id_shop)
            }



            return { message: 'Creacion de producto exitosa', result: result }
        } catch (error) {
            throw error
        }

    }


    async updateProduct(id_shop, id, data, files) {
        try {
            // 1. Solo procesamos imágenes si se subieron archivos nuevos
            if (files && files.length > 0) {
                let newImages = [];

                // Switch Ambiental para SUBIDA
                if (process.env.NODE_ENV === 'production') {
                    for (const file of files) {
                        const url = await uploadToCloudinary(file, 'products');
                        newImages.push(url);
                    }
                } else {
                    newImages = await saveImages(files, 'products');
                }

                if (newImages.length > 0) {
                    // Obtenemos las imágenes actuales para limpiar
                    const currentImages = await ProductRepository.getProductImages(id_shop, id);

                    // Switch Ambiental para BORRADO (Limpieza)
                    if (currentImages && currentImages.length > 0) {
                        const imagesToDelete = currentImages.map(img => img.url);

                        if (process.env.NODE_ENV === 'production') {
                            await deleteImagesToCloudinary(imagesToDelete);
                        } else {
                            deleteImages(imagesToDelete);
                        }
                    }


                    data.images = JSON.stringify(newImages);

                    // Actualizamos o creamos en la tabla de relación/imágenes si es necesario
                    const [affectedRows] = await ProductRepository.updateImage(id_shop, id, newImages);
                    if (affectedRows === 0) {
                        await ProductRepository.createImage(id_shop, id, newImages);
                    }
                }
            }

            return await ProductRepository.updateProduct(id_shop, id, data);

        } catch (error) {
            console.error("Error en updateProduct Service:", error);
            throw error;
        }
    }

    async listProductsByCategory(id_shop, id_category) {
        try {
            const result = await ProductRepository.listProductsByCategory(id_shop, id_category)
            return result
        }
        catch (error) {
            throw error
        }
    }
    async listProducts(id_shop, active) {
        try {
            const where = { id_shop }
            if (active !== undefined) {
                where.active = active === 'true'
            }


            const result = await ProductRepository.listProducts(where)
            return result
        } catch (error) {
            throw error
        }

    }
    async updateCategoryProducts(id_shop, id_category, ids_products) {
        try {
            const chekProducts = await ProductRepository.chekProductsExistence(id_shop, ids_products)
            const foundSet = new Set(chekProducts.map(p => p.id));  //Aqui convertimos a un array plano

            const missingIds = ids_products.filter(
                id => !foundSet.has(id)
            );

            if (missingIds.length > 0) {
                throw new Error('Los siguientes productos no existen: ' + missingIds.join(', '))
            }

            const result = await ProductRepository.updateCategoryProducts(id_shop, id_category, ids_products)
            return result

        } catch (error) {
            throw error
        }
    }

    async listProductById(id_shop, id) {

        try {
            const result = await ProductRepository.listProductById(id_shop, id)
            if (!result) {
                const error = new Error('El producto no existe')
                error.status = 400
                throw error
            }
            return result
        } catch (error) {
            throw error
        }

    }
    async desactivateProduct(id_shop, id) {
        try {
            const result = await ProductRepository.desactivateProduct(id_shop, id)
            const [filasAfectadas] = result
            if (filasAfectadas === 0) {
                return { message: "El producto ya estaba desactivado" }
            }
            return { message: 'Estado del producto desactivado correctamente' }

        } catch (error) {
            throw error
        }

    }
    async activateProduct(id_shop, id) {
        try {
            const result = await ProductRepository.activateProduct(id_shop, id)
            const [filasAfectadas] = result
            if (filasAfectadas === 0) {
                return { message: "El producto ya estaba activado" }
            }
            return { message: 'Estado del producto activado correctamente' }

        } catch (error) {
            throw error
        }

    }

    async deleteProduct(id_shop, id) {
        try {
            const sales = await SaleItemRepository.getSalesItemsByProduct(id_shop, id)

            if (sales.length > 0) {
                const error = new Error
                error.status = 400
                error.message = 'El producto seleccionado tiene ventas asociadas, no es posible eliminarlo'
                throw error
            }

            const movementsInventory = await this.inventoryService.getMovementByProduct(id_shop, id)
            console.log('MMMMMMMMMM', movementsInventory)

            if (movementsInventory.length > 0) {
                const error = new Error
                error.message = 'El producto seleccionado tiene movimientos de inventario asociados, no es posible eliminarlo'
                error.status = 400
                throw error
            }


            const result = await ProductRepository.deleteProduct(id_shop, id)

            const isProduction = process.env.NODE_ENV === 'production';
            if (result && result.length > 0) {
                if (isProduction) {

                    await deleteImagesToCloudinary(result);
                } else {
                    deleteImages(result);
                }
            }


            return { message: 'Producto eliminado correctamente' }

        } catch (error) {
            throw error
        }
    }

    async searchProductIds(id_shop, ids, transaction = null) {
        try {
            const result = await ProductRepository.searchProductIds(id_shop, ids, transaction)

            const products_ids = result.map(p => p.id)
            const missing = ids.filter(id => !products_ids.includes(id))
            if (missing.length > 0) {
                throw new Error('Estos productos no existen: ' + missing.join(', '))
            }
            return result

        } catch (error) {
            throw error
        }
    }

    async listProductsByTax(id_shop, id_tax) {
        try {
            await this.taxService.listTaxesById(id_shop, id_tax)
            const result = await ProductRepository.listProductsByTax(id_shop, id_tax)
            return result
        }
        catch (error) {
            throw error
        }
    }

}