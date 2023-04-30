const { Contest, Sequelize } = require('../models');
const CONSTANTS = require('../constants');
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

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries
) => {
  const object = {
    where: {},
    order: [],
  };
  const status = {
    status: ownEntries
      ? {
          [Sequelize.Op.or]: [
            CONSTANTS.CONTEST_STATUS_FINISHED,
            CONSTANTS.CONTEST_STATUS_ACTIVE,
          ],
        }
      : CONSTANTS.CONTEST_STATUS_ACTIVE,
  };
  if (typeIndex) {
    Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(object.where, { id: contestId });
  }
  if (industry) {
    Object.assign(object.where, { industry });
  }
  if (awardSort) {
    object.order.push(['prize', awardSort]);
  }
  Object.assign(object.where, status);
  object.order.push(['id', 'desc']);
  return object;
};

const getPredicateTypes = (index) => {
  return {
    [Sequelize.Op.or]: [CONSTANTS.TYPES_FOR_CONTESTS[index].split(',')],
  };
};

module.exports.getCharacteristics = (contestType) => {
  let characteristic1;
  let characteristic2;
  switch (contestType) {
    case CONSTANTS.NAME_CONTEST: {
      (characteristic1 = 'nameStyle'), (characteristic2 = 'typeOfName');
      break;
    }
    case CONSTANTS.TAGLINE_CONTEST: {
      characteristic1 = 'typeOfTagline';
      break;
    }
    case CONSTANTS.LOGO_CONTEST: {
      characteristic1 = 'brandStyle';
      break;
    }
    default:
  }
  return { characteristic1, characteristic2 };
};
