'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Couriers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email_courier: {
        type: Sequelize.STRING
      },
      password_courier: {
        type: Sequelize.STRING
      },
      fullname_courier: {
        type: Sequelize.STRING
      },
      image_courier: {
        type: Sequelize.TEXT
      },
      transportationType_courier: {
        type: Sequelize.STRING
      },
      maxLoad_courier: {
        type: Sequelize.STRING
      },
      nopol_courier: {
        type: Sequelize.STRING
      },
      nomor_courier: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Couriers');
  }
};