'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    queryInterface.addColumn('Mail', 'userName', {
      type: Sequelize.STRING,  
      references: {
        model: 'Users', 
        field: 'id'
      }, 
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
   
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Mail', 'userName')
  }
};
