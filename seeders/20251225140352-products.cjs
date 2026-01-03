'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('products', [
      {
        id: 1,
        name: 'Coca-Cola 350ml',
        description: 'Bebida gaseosa',
        price: 2500,
        id_shop: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Pan Baguette',
        description: 'Pan fresco',
        price: 1500,
        id_shop: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null);
  }
};
