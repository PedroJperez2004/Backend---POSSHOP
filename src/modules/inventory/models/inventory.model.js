import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class Inventory extends Model { }

Inventory.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        type: { type: DataTypes.ENUM('in', 'out'), allowNull: false },
        note: { type: DataTypes.TEXT, allowNull: true },
        id_shop: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: 'Inventory',
        tableName: 'inventory',
        timestamps: true,
    }
);

Inventory.associate = (models) => {
    Inventory.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    Inventory.belongsTo(models.Shop, { foreignKey: 'id_shop', as: 'shop' });
};

export default Inventory;
