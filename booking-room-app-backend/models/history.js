'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            History.belongsTo(models.User);
        }
    }
    History.init({
        roomId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        startDate: DataTypes.STRING,
        endDate: DataTypes.STRING,
        sumMoney: DataTypes.STRING,
        duration: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};