'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }
  Room_Service.init({
    roomId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Room_Service',
  });
  return Room_Service;
};