'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logs_auditoria', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.UUID,                // <-- Cambiado a UUID
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },

      // Qué acción ocurrió
      action: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      // Sobre qué entidad ocurrió
      entity: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      // ID del registro afectado
      entity_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      // Información adicional (antes/después, motivo, valores, etc.)
      details: {
        type: Sequelize.JSON,
        allowNull: true
      },

      // Monto asociado (solo si aplica)
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },

      id_shop: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'shops', key: 'id' }
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logs_auditoria');
  }
};
