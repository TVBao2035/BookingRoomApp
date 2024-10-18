'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Histories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            sumMoney: {
                type: Sequelize.INTEGER,
            },
            duration: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            roomId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            startDate: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            endDate: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Histories');
    }
};