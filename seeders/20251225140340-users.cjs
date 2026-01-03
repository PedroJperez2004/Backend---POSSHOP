const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('12345Pedro', SALT_ROUNDS);
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        userName: 'PedroJPerez',
        firstName: 'Pedro',
        lastName: 'Perez',
        email: 'pedro@gmail.comm',
        phone: '555-1000',
        password: hashedPassword,
        role: 'admin',
        id_shop: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
