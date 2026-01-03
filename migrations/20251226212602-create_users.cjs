'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,            // Cambiado a UUID
        defaultValue: Sequelize.UUIDV4, // Genera UUID automáticamente
        primaryKey: true
      },
      userName: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      firstName: { type: Sequelize.STRING(50), allowNull: false },
      lastName: { type: Sequelize.STRING(50), allowNull: false },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      phone: { type: Sequelize.STRING(20), allowNull: true },
      password: { type: Sequelize.STRING(255), allowNull: false },
      role: { type: Sequelize.ENUM('admin', 'employee'), allowNull: false },
      id_shop: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'shops', key: 'id' },
        onUpdate: 'CASCADE',          // Recomiendo agregar cascada para integridad
        onDelete: 'RESTRICT'           // Evita borrar shop si hay usuarios
      },
      active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
