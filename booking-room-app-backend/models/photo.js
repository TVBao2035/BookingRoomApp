'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  
      Photo.belongsTo(models.Room);
    }
  }
  Photo.init({
    roomId: DataTypes.INTEGER,
    link: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};