const { issueToken, passwordCompare } = require('../services/auth.service');
const {
  userCreation,
  updateUser,
  findUser,
} = require('../services/user.service');
const NotUniqueEmail = require('../errors/NotUniqueEmail');

module.exports.registration = async (req, res, next) => {
  try {
    const { body, hashPass: password } = req;
    const newUser = await userCreation(Object.assign(body, { password }));
    const accessToken = await issueToken(newUser);
    await updateUser({ accessToken }, newUser.id);
    res.status(201).send({ token: accessToken });
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
    const accessToken = await issueToken(foundUser);
    await updateUser({ accessToken }, foundUser.id);
    res.status(200).send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};
