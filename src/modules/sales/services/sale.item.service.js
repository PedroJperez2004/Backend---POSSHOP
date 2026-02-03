import { SaleItemRepository } from '../repository/sale.item.repository.js';
import { InventoryService } from '../../inventory/services/inventory.service.js'
import { TaxService } from '../../products/services/tax.service.js';
import { ProductService } from '../../products/services/product.service.js';
import { SaleRepository } from '../repository/sale.repository.js';

export class SaleItemService {
    constructor() {
        this.inventoryService = new InventoryService()
        this.taxService = new TaxService()
        this.productService = new ProductService()
    }
    async createSaleItem(user_id, data, products, sale_id, id_shop, transaction = null) {
        const productMap = new Map(
            products.map(p => [p.dataValues.id, p.dataValues])
        );

        const saleItems = await Promise.all(
            data.map(async item => {
                const product = productMap.get(item.product_id);
                const tax = await this.taxService.listTaxesById(
                    id_shop,
                    product.id_tax,
                    transaction
                );

                const subtotal = Number((item.quantity * product.price).toFixed(2));
                let taxAmount = Number(
                    (subtotal * (tax.percentage / 100)).toFixed(2)
                );
                if (tax.included_in_price === true) {
                    taxAmount = 0
                }

                return {
                    sale_id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: product.price,
                    subtotal,
                    tax_amount: taxAmount,
                    id_shop,
                    id_tax: tax.id
                };
            })
        );




        const result = await SaleItemRepository.create(
            saleItems,
            transaction
        );

        for (const item of saleItems) {
            await this.inventoryService.createMovement(
                user_id,
                item.product_id,
                item.quantity,
                'out',
                'Venta',
                id_shop,
                transaction
            );
        }

        return result;
    }

    async createReverseSaleItem(user_id, saleItems, transaction = null) {
        try {
            const result = await SaleItemRepository.create(
                saleItems, transaction
            );

            for (const item of saleItems) {
                await this.inventoryService.createMovement(
                    user_id,
                    item.product_id,
                    item.quantity,
                    'in',
                    'Devolucion',
                    item.id_shop,
                    transaction

                );
            }
            return result
        } catch (error) {
            throw error
        }
    }

    async searchSalesDetailById(id, id_shop, transaction = null) {
        try {
            return await SaleItemRepository.searchSalesDetailById(id, id_shop, transaction)

        } catch (error) {
            throw error
        }
    }

    async getAll(id_shop) {
        try {
            return await SaleItemRepository.getAll(id_shop);
        } catch (error) {
            throw error
        }
    }
    async getSalesItemsByProduct(id_product, id_shop) {
        try {
            await this.productService.listProductById(id_shop, id_product)
            const sales = await SaleItemRepository.getSalesItemsByProduct(id_shop, id_product)

            return sales
        } catch (error) {
            throw error
        }
    }

    async getSaleItemsBySaleId(id_sale, id_shop) {
        try {
            const sale = await SaleRepository.searchSaleById(id_sale, id_shop)
            if (!sale) {
                throw new Error('Venta no encontrada')
            }
            const items = await this.searchSalesDetailById(id_sale, id_shop)
            if (!items) {
                throw new Error('Items no encontrados')
            }
            return items


        } catch (error) {
            throw error

        }

    }

}