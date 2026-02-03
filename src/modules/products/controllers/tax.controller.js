import { TaxService } from '../services/tax.service.js';
import { ProductService } from '../services/product.service.js';

export class TaxController {
    constructor() {
        this.taxService = new TaxService();
        this.productService = new ProductService();
    }
    async createTax(req, res) {

        try {
            const { id_shop } = req.user;
            const result = await this.taxService.createTax(id_shop, req.body)

            return res.status(201).json({
                ok: true,
                message: result.message,
                tax: result.tax
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }



    }

    async listTaxes(req, res) {
        try {
            const { id_shop } = req.user;
            const result = await this.taxService.listTaxes(id_shop);
            return res.status(200).json(result);

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });

        }
    }
    async listTaxesById(req, res) {
        try {
            const { id_shop } = req.user;
            const result = await this.taxService.listTaxesById(id_shop, req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }
    }

    async desactivateTax(req, res) {
        try {
            const { id } = req.params
            const id_shop = req.user.id_shop

            const tax = await this.taxService.listTaxesById(id_shop, id)

            const result = await this.taxService.desactivateTax(id_shop, tax.id)

            return res.status(200).json({
                result: result
            })

        } catch (error) {
            return res
                .status(error.status || 500)
                .json({ message: error.message })
        }
    }

    async activateTax(req, res) {
        try {
            const { id } = req.params
            const id_shop = req.user.id_shop

            const tax = await this.taxService.listTaxesById(id_shop, id)

            const result = await this.taxService.activateTax(id_shop, tax.id)

            return res.status(200).json({
                result: result
            })

        } catch (error) {
            return res
                .status(error.status || 500)
                .json({ message: error.message })
        }
    }
    async delete(req, res) {
        try {
            const id_shop = req.user.id_shop
            const { id } = req.params

            const tax = await this.taxService.listTaxesById(id_shop, id)

            const result = await this.taxService.delete(id_shop, tax.id)
            return res.status(200).json({
                result
            })


        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })

        }
    }
    async update(req, res) {
        try {
            const id_shop = req.user.id_shop
            const { id } = req.params

            const tax = await this.taxService.listTaxesById(id_shop, id)
            const data = {
                ...req.body
            }
            const result = await this.taxService.update(id_shop, tax.id, data)
            return res.status(200).json({
                result
            })


        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })

        }
    }
}