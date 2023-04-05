const path = require('path');
const fs = require('fs');
const moment = require('moment');
const { LOGS_DEFAULT_DIR, LOGS_DAILY_DEFAULT_DIR, LOGS_FILENAME } = require('../constants');
const { errorLogger } = require('../config/winston');
const env = process.env.NODE_ENV || 'development';
const devLogPath = path.resolve(__dirname, LOGS_DEFAULT_DIR);
const logPath =
  env === 'production' ? `/var/www/_logs` : devLogPath;

const pathToFile = path.resolve(logPath, 'error.log');

const readFile = () => {
  const fileData = fs.readFileSync(pathToFile, 'utf-8');
  const dataArray = fileData.split('\n').filter(Boolean);
  const outputArray = dataArray.length
    ? dataArray.map((logString) => {
        const parsedLog = JSON.parse(logString);
        delete parsedLog.stackTrace;
        return parsedLog;
      })
    : null;
  return JSON.stringify(outputArray)
    .replace('[', '')
    .replace(']', '')
    .replace('},{', '}\n{');
};

module.exports.scheduleLogger = () => {
  try {
    if (fs.existsSync(pathToFile)) {
      const newFileName = `${moment().format('YYYY-MM-DTHH_mm_ss')}-${LOGS_FILENAME}`;
      const appendPathFile = path.resolve(`${logPath}${LOGS_DAILY_DEFAULT_DIR}`, newFileName)
      fs.appendFileSync(
        appendPathFile,
        readFile(),
        'utf-8'
      );
      fs.writeFileSync(pathToFile, '');
    }
  } catch (error) {
    errorLogger.error(error);
  }
};
