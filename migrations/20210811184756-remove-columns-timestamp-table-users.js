'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'createdAt'),
      queryInterface.removeColumn('users', 'updatedAt')
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'createdAt', {
        allowNull: false,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('users', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE
      })
    ]);
  }
};
