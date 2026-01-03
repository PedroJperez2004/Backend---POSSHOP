'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('sales', [
      {
        id: 1,
        user_id: 2,
        total: 6500,
        status: 'completed',
        id_shop: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sales', null);
  }
};
