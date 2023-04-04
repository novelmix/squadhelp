module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'todo-dev',
    host: 'db-dev',
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'migrations',
    seederStorageTableName: 'seeders',
  },
  test: {
    username: 'postgres',
    password: 'admin',
    database: 'todo-test',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'migrations',
    seederStorageTableName: 'seeders',
  },
  production: {
    username: 'postgres',
    password: 'admin',
    database: 'todo-prod',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: 'Op',
    seederStorage: 'sequelize',
    migrationStorageTableName: 'migrations',
    seederStorageTableName: 'seeders',
  },
};


// {
//   "development": {
//     "username": "postgres",
//     "password": "password",
//     "database": "todo-dev",
//     "host": "db-dev",
//     "dialect": "postgres",
//     "operatorsAliases": "Op",
//     "seederStorage": "sequelize",
//     "migrationStorageTableName": "migrations",
//     "seederStorageTableName": "seeders"
//   },
//   "test": {
//     "username": "postgres",
//     "password": "admin",
//     "database": "todo-test",
//     "host": "localhost",
//     "dialect": "postgres",
//     "operatorsAliases": "Op",
//     "seederStorage": "sequelize",
//     "migrationStorageTableName": "migrations",
//     "seederStorageTableName": "seeders"
//   },
//   "production": {
//     "username": "postgres",
//     "password": "admin",
//     "database": "todo-prod",
//     "host": "localhost",
//     "dialect": "postgres",
//     "operatorsAliases": "Op",
//     "seederStorage": "sequelize",
//     "migrationStorageTableName": "migrations",
//     "seederStorageTableName": "seeders"
//   }
// }
