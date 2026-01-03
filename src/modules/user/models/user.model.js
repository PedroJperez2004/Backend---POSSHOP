import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userName: { type: DataTypes.STRING(50), allowNull: false, unique: true },
        firstName: { type: DataTypes.STRING(50), allowNull: false },
        lastName: { type: DataTypes.STRING(50), allowNull: false },
        email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
        phone: { type: DataTypes.STRING(20), allowNull: true },
        password: { type: DataTypes.STRING(255), allowNull: false },
        role: { type: DataTypes.ENUM('admin', 'employee'), allowNull: false },
        id_shop: { type: DataTypes.INTEGER, allowNull: false },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    }
);

User.associate = (models) => {
    User.belongsTo(models.Shop, { foreignKey: 'id_shop', as: 'shop' });
    User.hasMany(models.Sale, { foreignKey: 'user_id', as: 'sales' });
    User.hasMany(models.LogsAuditoria, { foreignKey: 'user_id', as: 'logs' });
};

export default User;
