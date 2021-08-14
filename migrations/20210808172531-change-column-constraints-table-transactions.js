'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('transactions', 'description', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('transactions', 'value', {
        type: Sequelize.FLOAT,
        allowNull: false
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('transactions', 'description', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('transactions', 'value', {
        type: Sequelize.FLOAT,
        allowNull: true
      })
    ]);
  }
};
