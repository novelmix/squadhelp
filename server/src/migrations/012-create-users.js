'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          field: 'first_name',
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          field: 'last_name',
          type: Sequelize.STRING,
          allowNull: false,
        },
        displayName: {
          field: 'display_name',
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        avatar: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'anon.png',
        },
        role: {
          type: Sequelize.ENUM('customer', 'creator'),
          allowNull: false,
        },
        balance: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 0,
        },
        accessToken: {
          field: 'access_token',
          type: Sequelize.TEXT,
          allowNull: true,
        },
        rating: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
      })
      .then(() =>
        queryInterface.addConstraint('users', {
          type: 'check',
          fields: ['balance'],
          where: {
            balance: {
              [Sequelize.Op.gte]: 0,
            },
          },
        })
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
