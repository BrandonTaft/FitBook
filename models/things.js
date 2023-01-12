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
    description: DataTypes.TEXT,
    poster: DataTypes.STRING,
    link: DataTypes.STRING,
    score: DataTypes.BIGINT,
    user_id: {
      type: DataTypes.INTEGER, 
      references: {
      model: 'Users', 
      field: 'id'
    }, 
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }

  }, {
    sequelize,
    modelName: 'Things',
  });
  return Things;
};