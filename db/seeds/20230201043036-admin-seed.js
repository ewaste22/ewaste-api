'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Administrators', [{
      "email_admin": "admin@gmail.com",
      "password": bcrypt.hashSync('admin', 10),
      "fullname_admin": "Admin",
      "image_admin": "https://i.ibb.co/0nQqQZg/1.jpg",
      "createdAt": new Date(),
      "updatedAt": new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Administrators', null, {});
  }
};
