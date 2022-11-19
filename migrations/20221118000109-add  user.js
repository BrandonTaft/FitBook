'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'title', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        
      ),
      queryInterface.addColumn(
        'Users',
        'bio',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Users', 'title'),
      queryInterface.removeColumn('Users', 'bio'),
    ]);
  },
};
