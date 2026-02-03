import { SaleItemService } from "../services/sale.item.service.js";

export class SaleItemController {
    constructor() {
        this.saleItemService = new SaleItemService();
    }

    async getAll(req, res) {
        try {
            const { id_shop } = req.user;
            const result = await this.saleItemService.getAll(id_shop);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }
    }

    async getSalesItemsByProduct(req, res) {
        try {
            const { productId } = req.params;
            const { id_shop } = req.user;

            const result = await this.saleItemService.getSalesItemsByProduct(productId, id_shop);
            return res.status(200).json(result);

        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }
    }

    async getSaleItemsBySaleId(req, res) {
        try {
            const { saleId } = req.params;
            const { id_shop } = req.user;

            const result = await this.saleItemService.getSaleItemsBySaleId(saleId, id_shop);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })

        }
    }

}