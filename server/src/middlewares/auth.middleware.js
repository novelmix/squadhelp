const bcrypt = require('bcrypt');
const { findUser, returnUserFiends } = require('../services/user.service');
const { verifyAccessToken } = require('../services/auth.service');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const ServerError = require('../errors/ServerError');

module.exports.checkAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    const tokenData = await verifyAccessToken(accessToken);
    const foundUser = await findUser({ id: tokenData.userId });
    res.send(returnUserFiends(foundUser));
  } catch (err) {
    next(new TokenError());
  }
};

module.exports.checkToken = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next(new TokenError('need token'));
  }
  try {
    req.tokenData = await verifyAccessToken(accessToken);
    next();
  } catch (err) {
    next(new TokenError());
  }
};
module.exports.passwordHash = async (req, res, next) => {
  try {
    const { body,
      body: { password },
    } = req;
    req.hashPass = await bcrypt.hash(password, CONSTANTS.SALT_ROUNDS);
    delete body.password;
    next();
  } catch (err) {
    next(new ServerError('Server Error on hash password'));
  }
};
