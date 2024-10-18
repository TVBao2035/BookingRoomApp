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

    await queryInterface.bulkInsert('Group_Roles', [
   
      // {
      //   roleId: 1,
      //   groupId: 1,
      //  },
      //  {
      //   roleId: 2,
      //   groupId: 1,
      // },
      // {
      //   roleId: 3,
      //   groupId: 1,
      // },
       
      //  {
      //   roleId: 4,
      //   groupId: 1,
      //  },
    ],{});
  },

   async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('Group_Roles', null, {});
  }
};
