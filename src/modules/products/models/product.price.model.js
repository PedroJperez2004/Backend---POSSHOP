import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class ProductPrice extends Model { }

ProductPrice.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        start_date: { type: DataTypes.DATE, allowNull: false },
        end_date: { type: DataTypes.DATE, allowNull: true },
    },
    {
        sequelize,
        modelName: 'ProductPrice',
        tableName: 'product_prices',
        timestamps: true,
    }
);

ProductPrice.associate = (models) => {
    ProductPrice.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
};

export default ProductPrice;
