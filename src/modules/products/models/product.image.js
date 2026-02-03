import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class ProductImage extends Model { }

ProductImage.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        id_shop: { type: DataTypes.INTEGER, allowNull: false },
        url: { type: DataTypes.STRING(255), allowNull: false },
        alt_text: { type: DataTypes.STRING(255), allowNull: true },
        order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        isMain: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
        sequelize,
        modelName: 'ProductImage',
        tableName: 'product_images',
        timestamps: true, // Sequelize seguirá manejando createdAt y updatedAt
    }
);

ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    ProductImage.belongsTo(models.Shop, { foreignKey: 'id_shop', as: 'shop' });
};



export default ProductImage;
