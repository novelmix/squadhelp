module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('banks', [
      {
        card_number: '4564654564564564',
        name: 'SquadHelp',
        expiry: '11/22',
        cvc: '453',
        balance: 0,
      },
      {
        card_number: '4111111111111111',
        name: 'yriy',
        expiry: '09/23',
        cvc: '505',
        balance: 5000,
      },
    ], {});
  },

};
