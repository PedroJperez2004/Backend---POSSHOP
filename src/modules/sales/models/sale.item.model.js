import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class SaleItem extends Model { }

SaleItem.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        sale_id: { type: DataTypes.INTEGER, allowNull: false },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        id_shop: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: 'SaleItem',
        tableName: 'sale_items',
        timestamps: true,
    }
);

SaleItem.associate = (models) => {
    SaleItem.belongsTo(models.Sale, { foreignKey: 'sale_id', as: 'sale' });
    SaleItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    SaleItem.belongsTo(models.Shop, { foreignKey: 'id_shop', as: 'shop' });
};

export default SaleItem;
