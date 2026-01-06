'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // 1️⃣ Primero creas la tabla
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      description: { type: Sequelize.TEXT },
      price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      id_category: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'categories', key: 'id' } },
      id_shop: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'shops', key: 'id' } },
      active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });

    // 2️⃣ Luego agregas el constraint
    await queryInterface.addConstraint('products', {
      fields: ['stock'],
      type: 'check',
      where: {
        stock: {
          [Sequelize.Op.gte]: 0
        }
      },
      name: 'products_stock_not_negative'
    });
  },

  async down(queryInterface) {
    // Al borrar la tabla, el constraint se borra solo
    await queryInterface.dropTable('products');
  }
};
