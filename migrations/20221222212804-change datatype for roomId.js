'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('Chats', 'roomId', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.changeColumn('Chats', 'roomId', {
        type: Sequelize.INTEGER,
        allowNull: false
      })
    ]);
  },
};