import { SaleItemRepository } from '../repository/sale.item.repository.js';
import { InventoryService } from '../../inventory/services/inventory.service.js'
export class SaleItemService {
    constructor() {
        this.inventoryService = new InventoryService()
    }
    async createSaleItem(data, products, sale_id, id_shop, transaction = null) {
        const productMap = new Map(
            products.map(p => [p.dataValues.id, p.dataValues])
        );
        const saleItems = data.map(item => {
            const product = productMap.get(item.product_id);

            return {
                sale_id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: product.price,
                subtotal: item.quantity * product.price,
                id_shop
            };
        });

        const result = await SaleItemRepository.create(
            saleItems,
            transaction
        );

        for (const item of saleItems) {
            await this.inventoryService.createMovement(
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

    async createReverseSaleItem(saleItems, transaction = null) {
        try {
            const result = await SaleItemRepository.create(
                saleItems, transaction
            );

            for (const item of saleItems) {
                await this.inventoryService.createMovement(
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
}