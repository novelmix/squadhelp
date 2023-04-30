const { Contest, Rating, Offer, User } = require('../models');
const {
  updateContest,
  createWhereForAllContests,
  getCharacteristics,
} = require('../services/contest.service');
const { findAllByTypes } = require('../services/select.service');
const CONSTANTS = require('../constants');
const ServerError = require('../errors/ServerError');

module.exports.dataForContest = async (req, res, next) => {
  try {
    const {
      params: { contestType },
    } = req;
    const { characteristic1, characteristic2 } =
      getCharacteristics(contestType);
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean
    );
    const response = await findAllByTypes(types);
    res.status(200).send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    let contestInfo = await Contest.findOne({
      where: { id: req.params.contestId },
      order: [[Offer, 'id', 'asc']],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: Offer,
          required: false,
          where:
            req.tokenData.role === CONSTANTS.CREATOR
              ? { userId: req.tokenData.id }
              : { moderatorStatus: 'confirmed' },
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId: req.tokenData.id },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.status(200).send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  try {
    const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
    res.status(200).download(file);
  } catch (error) {
    next(error);
  }
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    const updatedContest = await updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.id,
    });
    res.status(200).send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  try {
    const { status } = req.params;
    const { id } = req.tokenData;
    const { pagination } = req;
    const contests = await Contest.findAll({
      where: { status, userId: id },
      order: [['id', 'DESC']],
      include: [
        {
          model: Offer,
          required: false,
          attributes: ['id'],
          where: { moderatorStatus: 'confirmed' },
        },
      ],
      ...pagination,
    });
    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );
    const haveMore = contests.length === 0 ? false : true;
    res.status(200).send({ contests, haveMore });
  } catch (error) {
    next(new ServerError(error.message));
  }
};

module.exports.getCreativeContests = async (req, res, next) => {
  try {
    const { id } = req.tokenData;
    const { typeIndex, contestId, industry, awardSort, ownEntries } = req.query;
    const { pagination } = req;
    const boolean = JSON.parse(ownEntries);
    const { where, order } = createWhereForAllContests(
      typeIndex,
      contestId,
      industry,
      awardSort,
      boolean
    );
    const contests = await Contest.findAll({
      where,
      order,
      include: [
        {
          model: Offer,
          required: boolean,
          where: boolean ? { userId: id } : {},
          attributes: ['id'],
        },
      ],
      ...pagination,
    });
    contests.forEach(
      (contest) => (contest.dataValues.count = contest.dataValues.Offers.length)
    );
    const haveMore = contests.length === 0 ? false : true;
    res.status(200).send({ contests, haveMore });
  } catch (error) {
    next(new ServerError(error.message));
  }
};
