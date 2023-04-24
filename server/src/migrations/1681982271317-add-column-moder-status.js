'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('offers', 'moderator_status', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'pending',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('offers', 'moderator_status');
  },
};