module.exports = {
  development: {
    database: 'shm-chat',
    host: 'mongo-dev',
    port: 27017,
  },
  production: {
    database: 'shm-chat',
    host: 'localhost',
    port: 27017,
  },
};
