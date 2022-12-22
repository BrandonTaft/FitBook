'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Chats', // table name
        'roomId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Chats', 'roomId')
    ]);
  },
};