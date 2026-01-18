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

}