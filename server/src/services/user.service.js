const { User } = require('../models');
const NotFound = require('../errors/UserNotFoundError');
const ServerError = require('../errors/ServerError');

module.exports.userCreation = async (data) => {
  const newUser = await User.create(data);
  if (!newUser) {
    throw new ServerError('server error on user creation');
  } else {
    return newUser.get({ plain: true });
  }
};

module.exports.updateUser = async (data, userId, transaction) => {
  const [updatedCount, [updatedUser]] = await User.update(data, {
    where: { id: userId },
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update user');
  }
  return updatedUser.dataValues;
};

module.exports.findUser = async (predicate, transaction) => {
  const result = await User.findOne({ where: predicate, transaction });
  if (!result) {
    throw new NotFound('user with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};

module.exports.returnUserFiends = (user) => {
  return {
    firstName: user.firstName,
    userId: user.id,
    role: user.role,
    lastName: user.lastName,
    avatar: user.avatar,
    displayName: user.displayName,
    balance: user.balance,
    email: user.email,
    rating: user.rating,
  };
};
