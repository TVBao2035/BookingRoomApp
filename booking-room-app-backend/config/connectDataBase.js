// import { Sequelize } from "sequelize";
const Sequelize = require('sequelize');
const sequelize = new Sequelize('booking_room', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});
const connectDataBase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
     } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDataBase