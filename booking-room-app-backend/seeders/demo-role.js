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

    await queryInterface.bulkInsert('Roles', [
   
      // {
      //   roleName: 'user/create',
      //   description: "Create user",
      //  },
      //  {
      //   roleName: 'user/read',
      //   description: "Read user",
      // },
      // {
      //   roleName: 'user/update',
      //   description: "Update user",
      // },
       
      //  {
      //   roleName: 'user/delete',
      //   description: "Delete user",
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
      await queryInterface.bulkDelete('Roles', null, {});
  }
};
