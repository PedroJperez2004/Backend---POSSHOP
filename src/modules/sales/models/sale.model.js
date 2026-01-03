import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class Sale extends Model { }

Sale.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.UUID, allowNull: false },
        sale_number: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        status: { type: DataTypes.ENUM('completed', 'reversed'), defaultValue: 'completed' },
        payment_method: { type: DataTypes.ENUM('cash', 'card', 'tranfer'), allowNull: false },
        reverse_sale_id: { type: DataTypes.INTEGER, allowNull: true },
        id_shop: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: 'Sale',
        tableName: 'sales',
        timestamps: true,
    }
);

Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Sale.belongsTo(models.Shop, { foreignKey: 'id_shop', as: 'shop' });
    Sale.hasMany(models.SaleItem, { foreignKey: 'sale_id', as: 'items' });
    Sale.belongsTo(models.Sale, { foreignKey: 'reverse_sale_id', as: 'reversedSale' });
    Sale.hasMany(models.Sale, { foreignKey: 'reverse_sale_id', as: 'reversals' });
};

export default Sale;
