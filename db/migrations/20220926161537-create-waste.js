"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Wastes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_waste: {
        type: Sequelize.STRING,
      },
      description_waste: {
        type: Sequelize.TEXT,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      poin_waste: {
        type: Sequelize.INTEGER,
      },
      image_waste: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Wastes");
  },
};
