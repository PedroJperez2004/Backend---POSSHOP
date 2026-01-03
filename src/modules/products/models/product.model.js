import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class Product extends Model { }

Product.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        id_category: { type: DataTypes.INTEGER, allowNull: true },
        id_shop: { type: DataTypes.INTEGER, allowNull: false },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: true,
    }
);

Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'id_category', as: 'category' });
    Product.belongsTo(models.Shop, { foreignKey: 'id_shop', as: 'shop' });
    Product.hasMany(models.ProductPrice, { foreignKey: 'product_id', as: 'prices' });
    Product.hasMany(models.Inventory, { foreignKey: 'product_id', as: 'inventory' });
    Product.hasMany(models.SaleItem, { foreignKey: 'product_id', as: 'saleItems' });
    Product.hasMany(models.ProductImage, { foreignKey: 'product_id', as: 'images' });
};

export default Product;
