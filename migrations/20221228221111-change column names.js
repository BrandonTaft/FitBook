'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn('Mails', 'priority', 'sendTo'  )
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.renameColumn('Mails', 'sendTo', 'priority')
    ]);
  },
};