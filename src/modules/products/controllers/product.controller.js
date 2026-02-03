import { ProductService } from "../services/product.service.js"
import { CategoryService } from "../services/category.service.js"
import { saveImages } from '../../../utils/saveImages.js'
export class ProductController {
    constructor() {
        this.categoryService = new CategoryService()
        this.productService = new ProductService()
    }

    async createProduct(req, res) {
        try {

            const { id_shop } = req.user

            const result = await this.productService.create(req.files, req.body, id_shop)
            return res.status(200).json({ Ok: true, Message: 'Producto Creado correctamente', Product: result })

        } catch (error) {
            return res.status(500).json({ message: error.message })

        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params
            const { id_shop } = req.user

            if (req.body.id_category) {
                const category = await this.categoryService.listCategoryById(req.user.id_shop, req.body.id_category)
                if (!category) {
                    throw error
                }
                if (category.active !== true) {
                    throw new Error('Categoría inactiva, seleccione otra')
                }

            }


            if (req.files.length > 1) {
                throw new Error('Máximo 1 imagen')
            }
            const product = await this.productService.listProductById(id_shop, id)
            const data = {
                ...req.body
            }

            const result = await this.productService.updateProduct(id_shop, product.id, data, req.files)
            return res.status(200).json({ Ok: true, Product: result })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }



    async listProductsByCategory(req, res) {
        try {
            const { id } = req.params

            await this.categoryService.listCategoryById(req.user.id_shop, id)

            const result = await this.productService.listProductsByCategory(req.user.id_shop, id)
            return res.status(200).json({ Ok: true, Products: result })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }
    }
    async listProducts(req, res) {
        try {
            const { active } = req.query
            const result = await this.productService.listProducts(req.user.id_shop, active)
            return res.status(200).json({ Ok: true, Products: result })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }


    async updateCategoryProducts(req, res) {
        try {
            const { id_category, ids_products } = req.body

            const category = await this.categoryService.listCategoryById(req.user.id_shop, id_category)
            if (!category) {
                throw error
            }
            if (category.active !== true) {
                throw new Error('Categoría inactiva, seleccione otra')
            }

            const result = await this.productService.updateCategoryProducts(req.user.id_shop, id_category, ids_products)
            return res.status(200).json({ Ok: true, Message: 'Productos actualizados correctamente', Products: result })

        } catch (error) {
            res.status(500).json({ message: error.message })

        }
    }

    async listProductById(req, res) {
        try {
            const { id } = req.params
            const result = await this.productService.listProductById(req.user.id_shop, id)
            return res.status(200).json({
                Ok: true,
                Product: result
            })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }
    }

    async desactivateProduct(req, res) {
        try {
            const { id } = req.params
            const id_shop = req.user.id_shop

            const product = await this.productService.listProductById(id_shop, id)

            const result = await this.productService.desactivateProduct(id_shop, product.id)

            return res.status(200).json({
                result: result
            })

        } catch (error) {
            return res
                .status(error.status || 500)
                .json({ message: error.message })
        }
    }

    async activateProduct(req, res) {
        try {
            const { id } = req.params
            const id_shop = req.user.id_shop

            const product = await this.productService.listProductById(id_shop, id)

            const result = await this.productService.activateProduct(id_shop, product.id)

            return res.status(200).json({
                result: result
            })

        } catch (error) {
            return res
                .status(error.status || 500)
                .json({ message: error.message })
        }
    }

    async deleteProduct(req, res) {
        try {

            const product = await this.productService.listProductById(req.user.id_shop, req.params.id)

            const result = await this.productService.deleteProduct(req.user.id_shop, product.id)
            return res.status(200).json({
                result: result
            })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }
    }

    async listProductsByTax(req, res) {
        try {
            const { id } = req.params
            const result = await this.productService.listProductsByTax(req.user.id_shop, id)
            return res.status(200).json({ Ok: true, Products: result })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }
    }
}