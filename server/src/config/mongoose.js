const mongoose = require('mongoose');
const path = require('path');
const { errorLogger } = require('../utils/errorLogger')
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config/mongo.js');
const config = require(configPath)[ env ];

const MONGO_URL = `mongodb://${ config.host }:${ config.port }/${ config.database }`;

module.exports.connect = async () => {
  try {
    mongoose.set('debug', env === 'development');
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.log(error);
    errorLogger.error(error);
    process.exit(1);
  }
};
