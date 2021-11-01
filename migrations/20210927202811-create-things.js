'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Things', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      name: {
        type: Sequelize.STRING
      },
      duedate: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.TEXT
      },
      priority: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      contactNumber: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        type: DataTypes.INTEGER, 
        references: {
        model: 'Users', 
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Things');
  }
};