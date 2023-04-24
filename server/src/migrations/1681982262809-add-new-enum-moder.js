'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TYPE enum_users_role ADD VALUE 'moderator';
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `CREATE TYPE enum_users_role1 AS ENUM ('customer', 'creator');`
    );
    await queryInterface.sequelize.query(
      `DELETE FROM users WHERE role = 'moderator';`
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE users ALTER COLUMN role TYPE enum_users_role1 USING (role::text::enum_users_role1);`
    );
    await queryInterface.sequelize.query(`DROP TYPE enum_users_role;`);
    await queryInterface.sequelize.query(
      `ALTER TYPE enum_users_role1 RENAME TO enum_users_role;`
    );
  },
};
