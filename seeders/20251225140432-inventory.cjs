'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('inventory', [
      {
        product_id: 1,
        quantity: 100,
        type: 'in',
        note: 'Stock inicial',
        id_shop: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        quantity: 50,
        type: 'in',
        note: 'Stock inicial',
        id_shop: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('inventory', null);
  }
};
