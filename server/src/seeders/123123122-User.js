const { hash } = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashPassword = await hash('hello12', SALT_ROUNDS);
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'Buyer',
          last_name: 'Test',
          display_name: 'BT',
          password: hashPassword,
          email: 'bt@test.test',
          role: 'customer',
        },
        {
          first_name: 'Creator',
          last_name: 'Test',
          display_name: 'CT',
          password: hashPassword,
          email: 'ct@test.test',
          role: 'creator',
        },
        {
          first_name: 'Moderator',
          last_name: 'Test',
          display_name: 'MT',
          password: hashPassword,
          email: 'mt@test.test',
          role: 'moderator',
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
