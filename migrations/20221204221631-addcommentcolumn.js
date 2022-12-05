'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Comments', // table name
        'pic', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        
      )
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Comments', 'pic')
    ]);
  },
};