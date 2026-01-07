import { ProductRepository } from "../repository/product.repository.js"
import { deleteImages } from "../../../utils/deleteImages.js";
export class ProductService {
    async create(data, dataFiles) {
        try {
            const result = await ProductRepository.create(data, dataFiles.images)
            return { message: 'Creacion de producto exitosa', result: result }

        } catch (error) {
            throw error
        }

    }

    async updateProduct(id, data) {
        try {
            const result = await ProductRepository.updateProduct(id, data)
            return result
        } catch (error) {
            throw error
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
    async desactivateProduct(id) {
        try {
            const result = await ProductRepository.desactivateProduct(id)
            const [filasAfectadas] = result
            console.log(filasAfectadas)
            if (filasAfectadas === 0) {
                return { message: "El producto ya estaba desactivado" }
            }
            return { message: 'Estado del producto desactivado correctamente' }

        } catch (error) {
            throw error
        }

    }
    async activateProduct(id) {
        try {
            const result = await ProductRepository.activateProduct(id)
            console.log(result)
            const [filasAfectadas] = result
            console.log(filasAfectadas)
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
            const result = await ProductRepository.deleteProduct(id_shop, id)
            console.log(result)
            console.log(typeof result)
            deleteImages(result)
            return { message: 'Producto eliminado correctamente' }
        } catch (error) {
            throw error
        }
    }

}