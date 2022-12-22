'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Chats', // table name
        'postId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Users', 
            field: 'id'
          }, 
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Chats', 'postId')
    ]);
  },
};