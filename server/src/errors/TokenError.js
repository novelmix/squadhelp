const ApplicationError = require('./ApplicationError');

class TokenError extends ApplicationError{
  constructor (message, code = 403) {
    super(message || 'token error', code);
  }
}

module.exports = TokenError;

