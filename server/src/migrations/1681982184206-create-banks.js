'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('banks', {
        cardNumber: {
          field: 'card_number',
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        expiry: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cvc: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        balance: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 0,
        },
      })
      .then(() =>
        queryInterface.addConstraint('banks', {
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
    await queryInterface.dropTable('banks');
  },
};
