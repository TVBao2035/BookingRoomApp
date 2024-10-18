'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.hasOne(models.Contract);
      // Room.hasOne(models.Photo, {foreignKey: 'photoId', as: 'photo'})
      Room.hasMany(models.Photo);
      Room.hasMany(models.Comment);
      Room.belongsToMany(models.Service, {through: "Room_Service", foreignKey: "roomId"});
    }
  }
  Room.init({
    photoId: DataTypes.INTEGER,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
    numberOfPeople: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};