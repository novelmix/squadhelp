const express = require('express');
const cors = require('cors');
const schedule = require('node-schedule');
const { connect } = require('./config/mongoose');
const { SCHEDULE_TIME } = require('./constants')
const { scheduleLogger } = require('./utils/scheduleLogger');
const routes = require('./routes/index');
const errorHandler = require('./error.handler');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(routes);
app.use(errorHandler);

schedule.scheduleJob(SCHEDULE_TIME, scheduleLogger);
connect();

module.exports = app
