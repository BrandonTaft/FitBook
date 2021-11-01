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
    priority: DataTypes.STRING,
    link: DataTypes.STRING,
    contact: DataTypes.STRING,
    contactNumber: DataTypes.BIGINT,
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