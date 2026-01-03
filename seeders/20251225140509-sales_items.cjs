'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('sale_items', [
      {
        sale_id: 1,
        product_id: 1,
        quantity: 2,
        price: 2500,
        id_shop: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sale_id: 1,
        product_id: 2,
        quantity: 1,
        price: 1500,
        id_shop: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sale_items', null);
  }
};
