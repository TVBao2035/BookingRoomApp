'use strict';

/** @type {import('sequelize-cli').Migration} */
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

    await queryInterface.bulkInsert('Groups', [
      // {
      //   groupName: "Admin",
      //   description: "Manage And Develop Website",
      // },
      // {
      //   groupName: "Manager",
      //   description: "Manage Customer and Room",
      // },
      // {
      //   groupName: "Customer",
      //   description: "Booking Room",
      // },
    ],{});
  },

   async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('Groups', null, {});
  }
};
