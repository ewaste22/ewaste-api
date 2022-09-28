"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Couriers", "transportationType_courier", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Couriers", "maxLoad_courier", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addColumn("Couriers", "nopol_courier", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("Couriers", "nomor_courier", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Couriers", "transportationType_courier");
    await queryInterface.removeColumn("Couriers", "maxLoad_courier");
    await queryInterface.removeColumn("Couriers", "nopol_courier");
    await queryInterface.removeColumn("Couriers", "nomor_courier");
  },
};
