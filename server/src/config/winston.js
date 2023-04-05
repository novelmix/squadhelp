const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { createLogger, transports, format } = require('winston');
const {
  LOGS_DEFAULT_DIR,
  LOGS_DAILY_DEFAULT_DIR,
  LOGS_FILENAME,
} = require('../constants');
const env = process.env.NODE_ENV || 'development';
const devLogPath = path.resolve(__dirname, LOGS_DEFAULT_DIR);
const logPath = env === 'production' ? `/var/www/_logs` : devLogPath;

if (!fs.existsSync(logPath)) {
  fs.mkdirSync(`${logPath}${LOGS_DAILY_DEFAULT_DIR}`, {
    recursive: true,
  });
}

const customerErrorFormat = format.printf(({ message, code, stack }) => {
  const timestamp = moment().valueOf();
  const nMessage =
    message.replace(/"/gm, "'").replace(/\r|\n/gm, ' ') ??
    'unexpected error occurred';
  const nCode = code ?? 500;
  const nStack = stack.replace(/\s+/gm, ' ').replace(/"/gm, "'") ?? '';
  return `{"message": "${nMessage}", "time": ${timestamp}, "code": ${nCode}, "stackTrace": "{${nStack}}"}`;
});

module.exports.errorLogger = createLogger({
  format: format.combine(format.errors({ stack: true }), customerErrorFormat),
  transports: [
    new transports.File({
      level: 'error',
      filename: `${logPath}/${LOGS_FILENAME}`,
    }),
  ],
});
