import { ProductService } from "../services/product.service.js"
import { CategoryService } from "../services/category.service.js"

export class ProductController {
    constructor() {
        this.categoryService = new CategoryService()
        this.productService = new ProductService()
    }

    async createProduct(req, res) {
        try {
            if (!req.files || req.files.length === 0) {
                throw new Error('Debe agregar al menos una imagen ')
            }
            const category = await this.categoryService.listCategoryById(req.user.id_shop, req.body.id_category)
            if (category.active !== true) {
                throw new Error('Categoría inactiva, seleccione otra')
            }

            const data = {
                ...req.body,
                id_shop: req.user.id_shop,
                id_category: category.id
            }
            const dataFiles = {
                ...req.files,
                alt_text: req.body.alt_text
                //
            }

            const result = await this.productService.create(data, dataFiles)
            return res.status(200).json({ Ok: true, Message: 'Producto Creado correctamente', Product: result })

        } catch (error) {
            return res.status(500).json({ message: error.message })

        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params
            const { id_shop } = req.user
            const product = await this.productService.listProductById(id_shop, id)
            const data = {
                ...req.body
            }
            const result = await this.productService.updateProduct(product.id, data)
            return res.status(200).json({ Ok: true, Product: result })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }



    async listProductsByCategory(req, res) {
        try {
            const { id } = req.params
            console.log('ID categoria: ', id)

            const category = await this.categoryService.listCategoryById(req.user.id_shop, id)
            if (category.active !== true) {
                throw new Error('Categoría inactiva, seleccione otra')
            }
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

            const result = await this.productService.desactivateProduct(product.id)

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

            const result = await this.productService.activateProduct(product.id)

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
}