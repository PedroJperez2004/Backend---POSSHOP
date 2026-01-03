import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class ProductImage extends Model { }

ProductImage.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        url: { type: DataTypes.STRING(255), allowNull: false },
        alt_text: { type: DataTypes.STRING(255), allowNull: true },
        order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
        sequelize,
        modelName: 'ProductImage',
        tableName: 'product_images',
        timestamps: true,
    }
);

ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
};

export default ProductImage;
