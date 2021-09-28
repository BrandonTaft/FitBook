'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Things extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Things.init({
    name: DataTypes.STRING,
    duedate: DataTypes.DATE,
    description: DataTypes.TEXT,
    priority: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Things',
  });
  return Things;
};