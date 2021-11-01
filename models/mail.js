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
    description: DataTypes.TEXT,
    priority: DataTypes.STRING,
    link: DataTypes.STRING,
    contact: DataTypes.STRING,
    contactNumber: DataTypes.BIGINT,
    publicUser_Id: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Mail',
  });
  return Mail;
};