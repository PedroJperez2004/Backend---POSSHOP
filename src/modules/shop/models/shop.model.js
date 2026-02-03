import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class Shop extends Model { }

Shop.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Shop',
        tableName: 'shops',
        timestamps: true,
    }
);

Shop.associate = (models) => {
    // Relación con usuarios
    Shop.hasMany(models.User, { foreignKey: 'id_shop', as: 'users' });

    // Relación con productos
    Shop.hasMany(models.Product, { foreignKey: 'id_shop', as: 'products' });

    // Relación con categorías (nueva)
    Shop.hasMany(models.Category, { foreignKey: 'id_shop', as: 'categories' });

    // Relación con inventario
    Shop.hasMany(models.Inventory, { foreignKey: 'id_shop', as: 'inventory' });

    // Relación con ventas
    Shop.hasMany(models.Sale, { foreignKey: 'id_shop', as: 'sales' });

    // Relación con logs
    Shop.hasMany(models.LogsAuditoria, { foreignKey: 'id_shop', as: 'logs' });

    // Relación con impuestos
    Shop.hasMany(models.Tax, { foreignKey: 'id_shop', as: 'taxes' });

    // Relación con product_images
    Shop.hasMany(models.ProductImage, { foreignKey: 'id_shop', as: 'product_images' });

    // Relación con sale_items
    Shop.hasMany(models.SaleItem, { foreignKey: 'id_shop', as: 'sale_items' });
};

export default Shop;
