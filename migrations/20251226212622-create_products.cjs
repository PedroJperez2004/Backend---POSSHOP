'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      description: { type: Sequelize.TEXT },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      id_category: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'categories', key: 'id' } },
      id_shop: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'shops', key: 'id' } },
      active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }, // <-- agregado
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
