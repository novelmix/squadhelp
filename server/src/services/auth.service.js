const bcrypt = require('bcrypt');
const { promisify } = require('util');
const { sign, verify } = require('jsonwebtoken');
const { returnUserFiends } = require('./user.service');
const CONSTANTS = require('../constants');
const UncorrectPassword = require('../errors/UncorrectPassword');

const promisifyJWTSing = promisify(sign);
const promisifyJWTVerify = promisify(verify);

module.exports.issueToken = async (user) => {
  return await promisifyJWTSing(returnUserFiends(user), CONSTANTS.JWT_SECRET, {
    expiresIn: CONSTANTS.ACCESS_TOKEN_TIME,
  });
};

module.exports.verifyAccessToken = async (accesstoken) =>
  await promisifyJWTVerify(accesstoken, CONSTANTS.JWT_SECRET);

module.exports.passwordCompare = async (userPassword, foundUserPassword) => {
  const passwordCompare = await bcrypt.compare(userPassword, foundUserPassword);
  if (!passwordCompare) {
    throw new UncorrectPassword('Wrong password');
  }
};
