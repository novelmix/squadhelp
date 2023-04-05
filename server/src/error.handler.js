const { MulterError } = require('multer');
const { errorLogger } = require('./config/winston');

module.exports = (err, req, res, next) => {
  console.log(err);
  if (
    err.message ===
      'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
      'new row for relation "Users" violates check constraint "Users_balance_ck"'
  ) {
    err.message = 'Not Enough money';
    err.code = 406;
  }
  if (err instanceof MulterError) {
    err.code = 500;
    err.message = 'server error';
  }
  if (!err.message || !err.code) {
    res.status(500).send('Server Error');
  } else {
    errorLogger.error(err);
    res.status(err.code).send(err.message);
  }
};
