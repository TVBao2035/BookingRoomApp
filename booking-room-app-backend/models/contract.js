'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contract.belongsTo(models.User);
      Contract.belongsTo(models.Room);
    }
  }
  Contract.init({
    roomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.TEXT,
    endDate: DataTypes.TEXT,
    sumMoney: DataTypes.INTEGER,
  
  }, {
    sequelize,
    modelName: 'Contract',
  });
  return Contract;
};