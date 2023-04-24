'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      participants: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
      },
      blackList: {
        field: 'black_list',
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        defaultValue: [false, false],
        allowNull: false,
      },
      favoriteList: {
        field: 'favorite_list',
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        defaultValue: [false, false],
        allowNull: false,
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversations');
  },
};
