'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Mail.init({
    name: DataTypes.STRING,
    duedate: DataTypes.DATE,
    message: DataTypes.TEXT,
    sendTo: DataTypes.STRING,
    link: DataTypes.STRING,
    sender: DataTypes.STRING,
    contactNumber: DataTypes.BIGINT,
    publicUser_Id: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Mail',
  });
  return Mail;
};