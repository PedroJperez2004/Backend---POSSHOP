'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('shops', [{
      name: 'POSSHOP Principal',
      address: 'Calle 123',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('shops', null);
  }
};
