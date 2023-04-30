const { Contest, Sequelize } = require('../models');
const CONSTANTS = require('../constants');
const { findBank } = require('../services/bank.service');
const ServerError = require('../errors/ServerError');
const RightsError = require('../errors/RightsError');
const NotEnoughMoney = require('../errors/NotEnoughMoney');

module.exports.parseBody = (req, res, next) => {
  req.body.contests = JSON.parse(req.body.contests);
  for (let i = 0; i < req.body.contests.length; i++) {
    if (req.body.contests[i].haveFile) {
      const file = req.files.splice(0, 1);
      req.body.contests[i].fileName = file[0].filename;
      req.body.contests[i].originalFileName = file[0].originalname;
    }
  }
  next();
};

const getBankInstance = async (req, res, next, check) => {
  try {
    const { name, number, expiry, cvc } = req.body;
    const cardNumber = number.replace(/ /g, '');
    const bank = await findBank({ name, cardNumber, expiry, cvc });
    req.bankInstance = bank;
    check();
  } catch (error) {
    next(error);
  }
};

module.exports.checkBalanceCard = async (req, res, next) => {
  try {
    await getBankInstance(req, res, next, async () => {
      const { bankInstance } = req;
      const { price, sum } = req.body;
      const difference = sum || price;
      const bank = sum
        ? await findBank({ cardNumber: CONSTANTS.SQUADHELP_BANK_NUMBER })
        : bankInstance;
      if (bank.balance - difference < 0) {
        return next(
          new NotEnoughMoney(
            `Not enough money or the service is currently unavailable`
          )
        );
      }
      next();
    });
  } catch (error) {
    next(new ServerError(error.message));
  }
};

module.exports.canGetContest = async (req, res, next) => {
  let result = null;
  try {
    if (req.tokenData.role === CONSTANTS.CUSTOMER) {
      result = await Contest.findOne({
        where: { id: req.params.contestId, userId: req.tokenData.id },
      });
    } else if (req.tokenData.role === CONSTANTS.CREATOR) {
      result = await Contest.findOne({
        where: {
          id: req.params.contestId,
          status: {
            [Sequelize.Op.or]: [
              CONSTANTS.CONTEST_STATUS_ACTIVE,
              CONSTANTS.CONTEST_STATUS_FINISHED,
            ],
          },
        },
      });
    }
    result ? next() : next(new RightsError());
  } catch (e) {
    next(new ServerError(e.message));
  }
};

module.exports.onlyForCreative = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    next(new RightsError());
  } else {
    next();
  }
};

module.exports.onlyForCustomer = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CREATOR) {
    return next(new RightsError('this page only for customers'));
  } else {
    next();
  }
};

module.exports.onlyForModerator = (req, res, next) => {
  if (req.tokenData.role !== CONSTANTS.MODERATOR) {
    return next(new RightsError('this page only for moderators'));
  } else {
    next();
  }
};

module.exports.canSendOffer = async (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.CUSTOMER) {
    return next(new RightsError());
  }
  try {
    const result = await Contest.findOne({
      where: {
        id: req.params.contestId,
      },
      attributes: ['status'],
    });
    if (
      result.get({ plain: true }).status === CONSTANTS.CONTEST_STATUS_ACTIVE
    ) {
      next();
    } else {
      return next(new RightsError());
    }
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.onlyForCustomerWhoCreateContest = async (req, res, next) => {
  try {
    const result = await Contest.findOne({
      where: {
        userId: req.tokenData.id,
        id: req.body.contestId,
        status: CONSTANTS.CONTEST_STATUS_ACTIVE,
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.canUpdateContest = async (req, res, next) => {
  try {
    const result = Contests.findOne({
      where: {
        userId: req.tokenData.id,
        id: req.body.contestId,
        status: { [Sequelize.Op.not]: CONSTANTS.CONTEST_STATUS_FINISHED },
      },
    });
    if (!result) {
      return next(new RightsError());
    }
    next();
  } catch (e) {
    next(new ServerError());
  }
};
