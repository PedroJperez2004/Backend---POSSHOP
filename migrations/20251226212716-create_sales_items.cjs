'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'sale_items',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },

        sale_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'sales', key: 'id' },
          onDelete: 'CASCADE'
        },

        product_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'products', key: 'id' }
        },

        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        price: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
        },

        subtotal: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
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
        },

        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      },
      {
        indexes: [
          { fields: ['sale_id'] },
          { fields: ['product_id'] },
          { fields: ['id_shop'] }
        ]
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sale_items');
  }
};
