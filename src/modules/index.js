// modules/index.js
import Shop from './shop/models/shop.model.js';
import LogsAuditoria from './shop/models/logs.auditoria.js';

import User from './user/models/user.model.js';

import Category from './products/models/category.model.js';
import Product from './products/models/product.model.js';
import ProductImage from './products/models/product.image.js';
import Tax from './products/models/tax.model.js';

import Inventory from './inventory/models/inventory.model.js';

import Sale from './sales/models/sale.model.js';
import SaleItem from './sales/models/sale.item.model.js';


const models = {
    Shop, LogsAuditoria, User, Category, Product, ProductImage, Tax, Inventory, Sale, SaleItem
};

// Crear asociaciones si existen
Object.values(models).forEach(model => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

export default models;
