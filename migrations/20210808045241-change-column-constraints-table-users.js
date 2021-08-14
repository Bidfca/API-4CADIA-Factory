'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'email', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('users', 'password', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('users', 'balance', {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'email', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('users', 'password', {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.changeColumn('users', 'balance', {
        type: Sequelize.FLOAT,
        allowNull: true,
      })
    ]);
  }
};
