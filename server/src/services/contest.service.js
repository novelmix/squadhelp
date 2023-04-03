const { Contest } = require('../models');
const ServerError = require('../errors/ServerError');

module.exports.updateContest = async (data, predicate, transaction) => {
  const [updatedCount, [updatedContest]] = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updatedContest.dataValues;
  }
};

module.exports.updateContestStatus = async (data, predicate, transaction) => {
  const updateResult = await Contest.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updateResult[0] < 1) {
    throw new ServerError('cannot update Contest');
  } else {
    return updateResult[1][0].dataValues;
  }
};
