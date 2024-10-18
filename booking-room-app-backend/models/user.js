'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Group);
      User.hasMany(models.Contract);
      User.hasMany(models.History);
      User.hasMany(models.Like, {foreignKey: 'userId'});
      User.hasMany(models.Comment);
    }
  }
  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    groupId: DataTypes.STRING,
    avatar: DataTypes.STRING,
    IDentify: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};