'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('transactions', 'updatedAt');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('transactions', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
  }
};
