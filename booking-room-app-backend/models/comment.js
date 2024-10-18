'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.User);
            Comment.hasMany(models.Like, {foreignKey: 'commentId', as: 'likes'});
            Comment.belongsTo(models.Room);
            Comment.hasMany(models.Comment, {foreignKey: 'commentId', as: 'children'});
          
        }
    }
    Comment.init({
        roomId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        commentId: DataTypes.INTEGER,
        message: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};