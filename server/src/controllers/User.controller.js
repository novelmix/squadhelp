const { Sequelize, sequelize, Rating, Offer, Contest } = require('../models');
const moment = require('moment');
const { v4: uuid } = require('uuid');
const controller = require('../socketInit');
const { updateUser, returnUserFiends } = require('../services/user.service');
const { updateBankBalance, findBank } = require('../services/bank.service');
const { createRating, updateRating } = require('../services/rating.service');
const CONSTANTS = require('../constants');

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  const { isFirst, offerId, mark, creatorId } = req.body;
  const userId = req.tokenData.id;
  try {
    const result = await sequelize.transaction(
      {
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
      },
      async (t) => {
        isFirst
          ? await createRating({ offerId, mark, userId }, t)
          : await updateRating({ mark }, { offerId, userId }, t);
        const offers = await Rating.findAll({
          include: [
            {
              model: Offer,
              required: true,
              where: { userId: creatorId },
            },
          ],
          transaction: t,
        });
        for (const offer of offers) {
          sum += offer.mark;
        }
        const avg = sum / offers.length;
        await updateUser({ rating: avg }, creatorId, t);
        return avg;
      }
    );
    controller.getNotificationController().emitChangeMark(creatorId);
    res.status(200).send({ userId: creatorId, rating: result });
  } catch (err) {
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  try {
    const { number, cvc, expiry, price, contests } = req.body;
    const numberReplace = number.replace(/ /g, '');
    await sequelize.transaction(async (t) => {
      await updateBankBalance(
        {
          balance: sequelize.literal(`
                  CASE
              WHEN "card_number"='${numberReplace}' AND "cvc"='${cvc}' AND "expiry"='${expiry}'
                  THEN "balance"-${price}
              WHEN "card_number"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}' AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}'
                  THEN "balance"+${price} END 
          `),
        },
        {
          cardNumber: {
            [Sequelize.Op.in]: [CONSTANTS.SQUADHELP_BANK_NUMBER, numberReplace],
          },
        },
        t
      );
      const orderId = uuid();
      contests.forEach((contest, index) => {
        const prize =
          index === contests.length - 1
            ? Math.ceil(price / contests.length)
            : Math.floor(price / contests.length);
        contest = Object.assign(contest, {
          status: index === 0 ? 'active' : 'pending',
          userId: req.tokenData.id,
          priority: index + 1,
          orderId,
          createdAt: moment().format('YYYY-MM-DD HH:mm'),
          prize,
        });
      });
      await Contest.bulkCreate(contests, {
        transaction: t,
      });
      return;
    });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }
    const updatedUser = await updateUser(req.body, req.tokenData.id);
    res.send(returnUserFiends(updatedUser));
  } catch (err) {
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  try {
    const { number, cvc, expiry, sum } = req.body;
    const numberReplace = number.replace(/ /g, '');
    await findBank({ cardNumber: numberReplace, cvc, expiry });
    const result = await sequelize.transaction(async (t) => {
      const updatedUser = await updateUser(
        { balance: sequelize.literal('balance - ' + req.body.sum) },
        req.tokenData.id,
        t
      );
      await updateBankBalance(
        {
          balance: sequelize.literal(`
          CASE 
            WHEN "card_number"='${numberReplace}' AND "expiry"='${expiry}' AND "cvc"='${cvc}'
              THEN "balance"+${sum}
            WHEN "card_number"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}' AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}'
              THEN "balance"-${sum} END`),
        },
        {
          cardNumber: {
            [Sequelize.Op.in]: [CONSTANTS.SQUADHELP_BANK_NUMBER, numberReplace],
          },
        },
        t
      );
      return updatedUser.balance;
    });
    res.status(200).send({ balance: result });
  } catch (err) {
    next(err);
  }
};