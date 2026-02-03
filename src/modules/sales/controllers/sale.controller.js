import { SaleService } from "../services/sale.service.js";


export class SaleController {
    constructor() {
        this.saleSevice = new SaleService();
    }
    async create(req, res) {

        try {
            const { id, id_shop } = req.user;
            const result = await this.saleSevice.create(id, id_shop, req.body)
            return res.status(201).json(result)

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }



    }
    async reverse(req, res) {
        try {
            const reverse_sale_id = req.params.id;
            const { id, id_shop } = req.user
            const result = await this.saleSevice.reverse(id, id_shop, reverse_sale_id)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }

    }

    async getAll(req, res) {
        try {
            const { status, from, to } = req.query; //Deben llegar las fechas así: FROM:  2026-01-01 TO: 2026-01-14
            const { id_shop } = req.user;

            const result = await this.saleSevice.getAll(id_shop, status, from, to);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }

    }

    async getEmployeeSales(req, res) {
        try {
            const { employeeId } = req.params;
            const { id_shop } = req.user;

            const result = await this.saleSevice.getEmployeeSales(employeeId, id_shop);
            return res.status(200).json(result);

        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message })
        }
    }


   
}