'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('shops', [{
      name: 'POSSHOP',
      address: 'Calle 123(Prueba)',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('shops', null);
  }
};
