'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat.init({
    body: DataTypes.TEXT,
    senderId: DataTypes.STRING,
    name: DataTypes.STRING,
    pic: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};