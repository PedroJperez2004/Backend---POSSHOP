import { TaxRepository } from "../repository/tax.repository.js";
import { ProductRepository } from "../repository/product.repository.js";

export class TaxService {

    async createTax(id_shop, data) {

        try {
            const { name, percentage, type, included_in_price, is_active } = data;

            const result = await TaxRepository.createTax(id_shop, name, percentage, type, included_in_price, is_active);

            if (result) {
                return { message: 'Creación de impuesto exitosa', tax: result };
            }
        } catch (error) {
            throw error;
        }
    }
    async listTaxes(id_shop) {
        try {
            const taxes = await TaxRepository.listTaxes(id_shop);
            return taxes;

        } catch (error) {
            throw error;
        }
    }
    async listTaxesById(id_shop, id, transaction = null) {
        try {
            const results = await TaxRepository.listTaxesById(id_shop, id, transaction);
            if (results === null) {
                const error = new Error('Impuesto no encontrado');
                error.status = 404;
                throw error;
            }
            return results;
        } catch (error) {
            throw error
        }
    }
    async desactivateTax(id_shop, id) {
        try {
          
            const result = await TaxRepository.desactivateTax(id_shop, id)
            const [filasAfectadas] = result
          
            if (filasAfectadas === 0) {
                return { message: "El impuesto ya estaba desactivado" }
            }
            return { message: 'Estado del impuesto desactivado correctamente' }

        } catch (error) {
            throw error
        }

    }
    async activateTax(id_shop, id) {
        try {
            const result = await TaxRepository.activateTax(id_shop, id)
            const [filasAfectadas] = result
            
            if (filasAfectadas === 0) {
                return { message: "El Impuesto ya estaba activado" }
            }
            return { message: 'Estado del impuesto activado correctamente' }

        } catch (error) {
            throw error
        }

    }
    async delete(id_shop, id) {
        try {
            const products = await ProductRepository.listProductsByTax(id_shop, id)
            if (products.length > 0) {
                const error = new Error
                error.status = 400
                error.message = 'El impuesto seleccionado tiene productos asociados, no es posible eliminarlo'
                throw error
            }
            const result = await TaxRepository.delete(id_shop, id)
            if (result > 0) {
                return { message: "Impuesto eliminado correctamente" }
            }

        } catch (error) {
            throw error
        }

    }
    async update(id_shop, id, data) {
        try {
            const products = await ProductRepository.listProductsByTax(id_shop, id)
            if (products.length > 0) {
                const error = new Error
                error.status = 400
                error.message = 'El impuesto seleccionado tiene productos asociados, no es posible actualizarlo'
                throw error
            }
            const result = await TaxRepository.update(id_shop, id, data)
            if (result > 0) {
                return { message: "Impuesto actualizado correctamente" }
            }

        } catch (error) {
            throw error
        }

    }
}