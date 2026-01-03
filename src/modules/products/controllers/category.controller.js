import { CategoryService } from "../services/category.service.js"

export class CategoryController {
    constructor() {
        this.categoryService = new CategoryService()
    }

    async createCategory(req, res) {
        try {
            req.body = {
                ...req.body,
                id_shop: req.user.id_shop
            }
            console.log(req.body)

            const result = await this.categoryService.createCategory(req.body)

            return res.status(201).json({
                ok: true,
                message: result.message
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                message: error.message || 'Error interno'
            })
        }
    }
    async listCategory(req, res) {
        try {
            const { active } = req.query
            const id_shop = req.user.id_shop
            const result = await this.categoryService.listCategory(id_shop, active)
            return res.status(200).json({ Category: result })
        } catch (error) {
            return res.status(500).json({ message: error.message })

        }
    }
    async listCategoryById(req, res) {
        try {
            const id_shop = req.user.id_shop
            const { id } = req.params
            const result = await this.categoryService.listCategoryById(id_shop, id)
            return res.status(200).json({
                user: result
            })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }

    }
    async updateCategory(req, res) {
        try {
            const { id_shop } = req.user
            const { id } = req.params
            const data = {
                ...req.body
            }

            const category = await this.categoryService.listCategoryById(id_shop, id)
            console.log(category)
            const result = await this.categoryService.updateCategory(category.id, data)
            return res.status(200).json({
                ok: true,
                message: result
            })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }

    }
    async desactivateCategory(req, res) {
        try {
            const { id } = req.params
            const id_shop = req.user.id_shop
            const category = await this.categoryService.listCategoryById(id_shop, id)

            const result = await this.categoryService.desactivateCategory(category.id)

            return res.status(200).json({
                message: 'Categoria desactivada',
                result
            })

        } catch (error) {
            return res
                .status(error.status || 500)
                .json({ message: error.message })
        }
    }

    async activateCategory(req, res) {
        try {
            const id_shop = req.user.id_shop
            const { id } = req.params

            const category = await this.categoryService.listCategoryById(id_shop, id)
            console.log(category.id)
            const result = await this.categoryService.activateCategory(category.id)

            return res.status(200).json({
                result: result
            })


        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })

        }
    }

}