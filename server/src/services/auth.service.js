const bcrypt = require('bcrypt');
const { promisify } = require('util');
const { sign, verify } = require('jsonwebtoken');
const { returnUserFiends } = require('./user.service');
const CONSTANTS = require('../constants');
const UncorrectPassword = require('../errors/UncorrectPassword');

const promisifyJWTSing = promisify(sign);
const promisifyJWTVerify = promisify(verify);

module.exports.issueAccessToken = async (user) =>
  await promisifyJWTSing(returnUserFiends(user), CONSTANTS.ACCESS_JWT_SECRET, {
    expiresIn: CONSTANTS.ACCESS_TOKEN_TIME,
  });

module.exports.issueRefreshToken = async (user) =>
  await promisifyJWTSing(returnUserFiends(user), CONSTANTS.REFRESH_JWT_SECRET, {
    expiresIn: CONSTANTS.REFRESH_TOKEN_TIME,
  });

module.exports.verifyAccessToken = async (accesstoken) =>
  await promisifyJWTVerify(accesstoken, CONSTANTS.ACCESS_JWT_SECRET);

module.exports.verifyRefreshToken = async (refreshToken) =>
  await promisifyJWTVerify(refreshToken, CONSTANTS.REFRESH_JWT_SECRET);

module.exports.passwordCompare = async (userPassword, foundUserPassword) => {
  const passwordCompare = await bcrypt.compare(userPassword, foundUserPassword);
  if (!passwordCompare) {
    throw new UncorrectPassword('Wrong password');
  }
};
