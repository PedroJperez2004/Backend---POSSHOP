import { ProductService } from "../../products/services/product.service.js"
import { SaleItemService } from "./sale.item.service.js"
import sequelize from '../../../config/database.js';

import { UserService } from "../../user/services/user.services.js";
import { SaleRepository } from "../repository/sale.repository.js"

export class SaleService {
    constructor() {
        this.saleItemService = new SaleItemService()
        this.productService = new ProductService()
        this.userService = new UserService()
    }
    async create(user_id, id_shop, data) {
        const transaction = await sequelize.transaction();

        try {
            const ids = data.products.map(p => p.product_id);
            const products = await this.productService.searchProductIds(
                id_shop,
                ids,
                transaction
            );


            const productMap = new Map(
                products.map(p => [p.dataValues.id, p.dataValues])
            );

            const stockInsufccient = [];
            for (const item of data.products) {
                const product = productMap.get(item.product_id);
                if (item.quantity > product.stock) {
                    stockInsufccient.push(item.product_id);
                }
            }

            if (stockInsufccient.length > 0) {
                const error = new Error(
                    `Stock insuficiente para los productos: ${stockInsufccient.join(', ')}`
                );
                error.status = 400;
                throw error;
            }

            const saleNumber = await this.generateSaleNumber();

            const saleCreated = await SaleRepository.create(
                user_id,
                saleNumber,
                data.payment_method,
                id_shop,
                transaction
            );


            const salesItems = await this.saleItemService.createSaleItem(
                data.products,
                products,
                saleCreated.id,
                id_shop,
                transaction
            );
            const status = 'completed'
            const total = salesItems.reduce((acc, item) => acc + item.subtotal, 0);
            const saleUpdated = await SaleRepository.updateSaleforItems(saleCreated.id, total, status, id_shop, transaction);


            await transaction.commit();
            return { ok: true, sale: saleUpdated, items: salesItems };

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }


    async generateSaleNumber() {
        try {
            const now = new Date();

            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            const hh = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');
            const ss = String(now.getSeconds()).padStart(2, '0');
            const dateString = `${yyyy}${mm}${dd}${hh}${min}${ss}`;
            const ms = String(now.getMilliseconds()).padStart(3, '0'); //Agregamos milisegundos
            const saleNumber = `${dateString}${ms}`;
            return saleNumber;

        } catch (error) {
            throw new Error('Error generando sale_number: ' + error.message);
        }
    }
    async reverse(user_id, id_shop, reverse_sale_id) {
        const transaction = await sequelize.transaction();
        try {

            const exisReverseSale = await SaleRepository.exisReverseSale(reverse_sale_id, id_shop, transaction)


            if (exisReverseSale) {
                throw new Error('La venta ya fué revertida')
            }

            const sale = await SaleRepository.searchSaleById(reverse_sale_id, id_shop, transaction)
            if (!sale) {
                throw new Error('Venta no encontrada')
            }
            const items = await this.saleItemService.searchSalesDetailById(reverse_sale_id, id_shop, transaction)

            if (!items) {
                throw new Error('Items no encontrados')
            }

            const saleNumber = await this.generateSaleNumber();



            const saleCreated = await SaleRepository.createReverseSale(
                user_id,
                saleNumber,
                sale.dataValues.payment_method,
                id_shop,
                reverse_sale_id,
                transaction
            );

            let products = []
            for (const item of items) {
                products.push({
                    sale_id: saleCreated.id,
                    product_id: item.dataValues.product_id,
                    quantity: item.dataValues.quantity,
                    price: item.dataValues.price,
                    subtotal: item.dataValues.subtotal,
                    reverse_sale_id: reverse_sale_id,
                    id_shop: id_shop,

                })

            }

            const saleItems = await this.saleItemService.createReverseSaleItem(
                products, transaction
            );

            if (!saleItems) {
                throw new Error('Items no encontrados')
            }
            const status = 'reversed'
            const total = sale.dataValues.total
            const saleUpdated = await SaleRepository.updateSaleforItems(saleCreated.id, total, status, id_shop, transaction);
            await transaction.commit();

            return saleUpdated

        } catch (error) {
            await transaction.rollback();
            throw error
        }

    }
    // async getAll(id_shop, status, from, to) {
    //     try {
    //         console.log('FROM: ', from, 'TO:', to);
    //         const data = { id_shop }

    //         if (status) {
    //             data.status = status
    //         }
    //         const sales = await SaleRepository.getAll(data)

    //         return sales
    //     } catch (error) {
    //         throw error
    //     }
    // }

    async getAll(id_shop, status, from, to) {
        try {
            const normalize = (v) => Array.isArray(v) ? v[0] : v;

            let fromDate = normalize(from);
            let toDate = normalize(to);

            // reglas de negocio
            if (fromDate && !toDate) {
                toDate = new Date().toISOString().slice(0, 10);
            }

            if (!fromDate && toDate) {
                fromDate = '1970-01-01'; // o fecha de creación del shop
            }

            const data = { id_shop };

            if (status) data.status = status;
            if (fromDate && toDate) {
                data.from = fromDate;
                data.to = toDate;
            }

            return await SaleRepository.getAll(data);
        } catch (error) {
            throw error;
        }
    }


    async getEmployeeSales(employeeId, id_shop) {
        try {
            await this.userService.listUserById(id_shop, employeeId)
            const sales = await SaleRepository.getEmployeeSales(employeeId, id_shop)
            return sales
        } catch (error) {
            throw error
        }
    }

}