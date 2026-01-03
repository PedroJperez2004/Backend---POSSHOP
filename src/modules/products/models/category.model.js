import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class Category extends Model { }

Category.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
        id_shop: { type: DataTypes.INTEGER, allowNull: false }, // nueva columna
    },
    {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        timestamps: true,
    }
);

Category.associate = (models) => {
    // Relación con productos
    Category.hasMany(models.Product, { foreignKey: 'id_category', as: 'products' });

    // Relación con la tienda
    Category.belongsTo(models.Shop, { foreignKey: 'id_shop', as: 'shop' });
};

export default Category;
