const { issueToken, passwordCompare } = require('../services/auth.service');
const {
  userCreation,
  updateUser,
  findUser,
} = require('../services/user.service');
const NotUniqueEmail = require('../errors/NotUniqueEmail');

module.exports.registration = async (req, res, next) => {
  try {
    const newUser = await userCreation(
      Object.assign(req.body, { password: req.hashPass }),
    );
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
    const foundUser = await findUser({ email: req.body.email });
    await passwordCompare(req.body.password, foundUser.password);
    const accessToken = await issueToken(foundUser);
    await updateUser({ accessToken }, foundUser.id);
    res.status(200).send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};
