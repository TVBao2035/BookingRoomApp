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

    await queryInterface.bulkInsert('Contracts', [
   
      // {
      //   roomId: 1,
      //   userId: 1,
      //   duration: 2
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
      await queryInterface.bulkDelete('Contracts', null, {});
  }
};
