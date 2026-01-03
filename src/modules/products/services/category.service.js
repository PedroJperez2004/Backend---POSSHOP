import { CategoryRepository } from "../repository/category.repository.js";

export class CategoryService {

    async createCategory(categoryData) {
        try {
            const { name, description, id_shop, active } = categoryData

            const result = await CategoryRepository.createCategory(name, description, id_shop, active)

            if (result) {
                return { message: 'Creacion de categoría exitosa' }

            }
        } catch (error) {
            throw error
        }
    }
    async listCategory(id_shop, active) {
        try {
            console.log(active)
            console.log(typeof active)

            const where = { id_shop }

            if (active !== undefined) {
                where.active = active === 'true'
            }
            const result = await CategoryRepository.listCategory({ where })
            return result
        } catch (error) {
            throw error;
        }


    }

    async listCategoryById(id_shop, id) {
        try {
            const result = await CategoryRepository.listCategoryById(id_shop, id)
            if (!result) {
                const error = new Error('El id ingresado no existe')
                error.status = 400
                throw error
            }
            return result

        } catch (error) {
            throw error
        }
    }
    async updateCategory(id, data) {
        try {
            const result = await CategoryRepository.updateCategory(id, data)
            return { User: result }
        } catch (error) {
            throw error
        }
    }

    async desactivateCategory(id) {
        try {
            const result = await CategoryRepository.desactivateCategory(id)
            const [filasAfectadas] = result
            if (filasAfectadas === 0) {
                return { message: "La categoria ya estaba desactivada" }
            }
            return { message: 'Estado de la categoria desactivada correctamente' }

        } catch (error) {
            throw error
        }

    }

    async activateCategory(id) {
        try {

            const result = await CategoryRepository.activateCategory(id)
            const [filasAfectadas] = result
            if (filasAfectadas === 0) {
                return { message: "La categoria ya estaba activada" }
            }
            return { message: 'Estado de la categoria activada correctamente' }

        } catch (error) {
            throw error
        }

    }


}