'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.UUID,                // <-- Cambiado a UUID
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      sale_number: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      total: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      status: { type: Sequelize.ENUM('completed', 'reversed'), defaultValue: 'completed' },
      payment_method: { type: Sequelize.ENUM('cash', 'card', 'tranfer'), allowNull: false },
      reverse_sale_id: {
        type: Sequelize.INTEGER,             // Esto sigue siendo int, porque referencia la misma tabla sales
        allowNull: true,
        references: { model: 'sales', key: 'id' }
      },
      id_shop: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'shops', key: 'id' } },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
