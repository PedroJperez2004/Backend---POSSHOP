
//History to prices
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_prices', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      product_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'products', key: 'id' } },
      price: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      start_date: { type: Sequelize.DATE, allowNull: false },
      end_date: { type: Sequelize.DATE, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_prices');
    
  }
};

