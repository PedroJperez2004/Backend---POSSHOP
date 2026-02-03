import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class Tax extends Model {
    static associate(models) {
        // Cada impuesto pertenece a una tienda
        this.belongsTo(models.Shop, { foreignKey: 'id_shop', as: 'shop' });
    }
}

Tax.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

        id_shop: { type: DataTypes.INTEGER, allowNull: false },

        name: { type: DataTypes.STRING(100), allowNull: false },

        percentage: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
            validate: { min: 0, max: 100 }
        },

        type: { type: DataTypes.STRING(50), allowNull: false },

        included_in_price: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

        is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    },
    {
        sequelize,
        modelName: 'Tax',
        tableName: 'taxes',
        timestamps: true
    }
);
Tax.associate = (models) => {
    Tax.belongsTo(models.Shop, { foreignKey: 'id_shop', as: 'shop' });
    Tax.hasMany(models.Product, { foreignKey: 'id_tax', as: 'products' });
};

export default Tax;
