'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn('users', 'balance', {
     type: Sequelize.FLOAT,
   });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'balance');
  }
};