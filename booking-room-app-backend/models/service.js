'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Service.belongsToMany(models.Room, {through: 'Room_Service', foreignKey: "serviceId"});
    }
  }
  Service.init({
    name: DataTypes.STRING,
    isDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};