'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('product_prices', [
      {
        product_id: 1,
        price: 2500,
        start_date: new Date(),
        end_date: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        price: 1500,
        start_date: new Date(),
        end_date: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('product_prices', null);
  }
};
