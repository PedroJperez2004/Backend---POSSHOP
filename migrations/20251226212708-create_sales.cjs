'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },

      sale_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },

      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },

      status: {
        type: Sequelize.ENUM('pending', 'completed', 'reversed'),
        allowNull: false,
        defaultValue: 'pending'
      },

      payment_method: {
        type: Sequelize.ENUM('cash', 'card', 'transfer'),
        allowNull: true
      },

      reverse_sale_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'sales',
          key: 'id'
        },
        onDelete: 'SET NULL',   // ⭐ CLAVE
        onUpdate: 'CASCADE'
      },

      id_shop: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shops',
          key: 'id'
        }
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
