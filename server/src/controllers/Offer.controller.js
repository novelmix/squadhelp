const { sequelize, Offer, User } = require('../models');
const controller = require('../socketInit');
const { updateContestStatus } = require('../services/contest.service');
const {
  createOffer,
  updateOffer,
  updateOfferStatus,
} = require('../services/offer.service');
const { updateUser, findUser } = require('../services/user.service');
const CONSTANTS = require('../constants');
const ServerError = require('../errors/ServerError');
const { sendEmailForCreatorByModerator } = require('../utils/sendEmail');

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.id;
  obj.contestId = req.params.contestId;
  try {
    const result = await createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.id });
    res.status(201).send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId }
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction
) => {
  const finishedContest = await updateContestStatus(
    {
      status: sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "order_id"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUS_FINISHED
      }'
            WHEN "order_id"='${orderId}' AND "priority"=${
        priority + 1
      }  THEN '${CONSTANTS.CONTEST_STATUS_ACTIVE}'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `),
    },
    { orderId },
    transaction
  );
  await updateUser(
    { balance: sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction
  );
  const updatedOffers = await updateOfferStatus(
    {
      status: sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction
  );
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers.filter(
    (offer) => offer.status === CONSTANTS.OFFER_STATUS_WON
  )[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId
      );
      res.status(200).send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      const result = await sequelize.transaction(async (t) => {
        const winningOffer = await resolveOffer(
          req.body.contestId,
          req.body.creatorId,
          req.body.orderId,
          req.body.offerId,
          req.body.priority,
          t
        );
        return winningOffer;
      });
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
};

module.exports.getOffersForModerator = async (req, res, next) => {
  try {
    const { pagination } = req;
    const offers = await Offer.findAll({
      where: { moderatorStatus: 'pending' },
      order: [['id', 'ASC']],
      include: [
        {
          model: User,
        },
      ],
      ...pagination,
    });
    const count = await Offer.count({
      where: { moderatorStatus: 'pending' },
    });
    res.status(200).send({ offers, count });
  } catch (error) {
    next(error);
  }
};

module.exports.updateOfferForModerator = async (req, res, next) => {
  try {
    const {
      params: { offerId: id },
      body: { status },
    } = req;
    const [offer] = await updateOfferStatus(
      { moderatorStatus: status },
      { id }
    );
    const user = await findUser({ id: offer.userId });
    delete user.password;
    delete user.accessToken;
    const contest = await offer.getContest();
    const options = {
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      title: contest.title,
      type: contest.contestType,
      status: offer.moderatorStatus,
      text: offer.text,
      file: offer.fileName,
    };
    await sendEmailForCreatorByModerator(options);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};
