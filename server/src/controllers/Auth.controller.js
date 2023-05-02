const {
  issueAccessToken,
  passwordCompare,
  issueRefreshToken,
  verifyRefreshToken,
} = require('../services/auth.service');
const {
  userCreation,
  updateUser,
  findUser,
} = require('../services/user.service');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const TokenError = require('../errors/TokenError')

module.exports.registration = async (req, res, next) => {
  try {
    const { body, hashPass: password } = req;
    const newUser = await userCreation(Object.assign(body, { password }));
    const accessToken = await issueAccessToken(newUser);
    const refreshToken = await issueRefreshToken(newUser);
    await updateUser({ accessToken }, newUser.id);
    res.status(201).send({ tokens: { accessToken, refreshToken } });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundUser = await findUser({ email });
    await passwordCompare(password, foundUser.password);
    const accessToken = await issueAccessToken(foundUser);
    const refreshToken = await issueRefreshToken(foundUser);
    await updateUser({ accessToken }, foundUser.id);
    res.status(200).send({ tokens: { accessToken, refreshToken } });
  } catch (err) {
    next(err);
  }
};

module.exports.refreshSession = async (req, res, next) => {
  try {
    const {
      body: { refreshToken: token },
    } = req;
    const verifyResult = await verifyRefreshToken(token);
    const foundUser = await findUser({ email: verifyResult.email });
    const accessToken = await issueAccessToken(foundUser);
    const refreshToken = await issueRefreshToken(foundUser);
    await updateUser({ accessToken }, foundUser.id);
    res.status(200).send({ tokens: { accessToken, refreshToken } });
  } catch (err) {
    next(new TokenError('invalid refresh token', 401));
  }
};
