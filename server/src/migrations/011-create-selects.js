'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('selects', {
      type: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      describe: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('selects');
  },
};
