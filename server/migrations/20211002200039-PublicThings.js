'use strict';


  module.exports = {
    up: async (queryInterface, Sequelize) => {
      
      queryInterface.addColumn('PublicThings', 'pub_id', {
        type: Sequelize.INTEGER,  
        references: {
          model: 'Users', 
          field: 'id'
        }, 
        onUpdate: 'cascade',
        onDelete: 'cascade'
      })
     
    },
  
    down: async (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('PublicThings', 'pub_id')
    }
  };