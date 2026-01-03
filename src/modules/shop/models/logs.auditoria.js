import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../config/database.js';

class LogsAuditoria extends Model { }

LogsAuditoria.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.UUID, allowNull: false },
        action: { type: DataTypes.STRING(50), allowNull: false },
        entity: { type: DataTypes.STRING(50), allowNull: false },
        entity_id: { type: DataTypes.INTEGER, allowNull: true },
        details: { type: DataTypes.JSON, allowNull: true },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
        id_shop: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: 'LogsAuditoria',
        tableName: 'logs_auditoria',
        timestamps: true,
    }
);

LogsAuditoria.associate = (models) => {
    LogsAuditoria.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    LogsAuditoria.belongsTo(models.Shop, { foreignKey: 'id_shop', as: 'shop' });
};

export default LogsAuditoria;
