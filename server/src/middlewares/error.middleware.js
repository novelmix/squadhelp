const { MulterError } = require('multer');
const { errorLogger } = require('../utils/errorLogger');

module.exports = (err, req, res, next) => {
  console.log(err);
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
