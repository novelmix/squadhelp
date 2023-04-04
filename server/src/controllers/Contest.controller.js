const { Contest, Select, Sequelize, sequelize, Rating, Offer, User } = require('../models');
const { updateContest }= require('../services/contest.service');
const CONSTANTS = require('../constants');
const {createWhereForAllContests} = require('../utils/functions');
const ServerError = require('../errors/ServerError');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const { body: { characteristic1, characteristic2 } } = req;
    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);
    const characteristics = await Select.findAll({
      where: {
        type: {
          [ Sequelize.Op.or ]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if (!response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    let contestInfo = await Contest.findOne({
      where: { id: req.headers.contestid },
      order: [
        [Offer, 'id', 'asc'],
      ],
      include: [
        {
          model: User,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
        },
        {
          model: Offer,
          required: false,
          where: req.tokenData.role === CONSTANTS.CREATOR
            ? { userId: req.tokenData.userId }
            : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: User,
              required: true,
              attributes: {
                exclude: [
                  'password',
                  'role',
                  'balance',
                  'accessToken',
                ],
              },
            },
            {
              model: Rating,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
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
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  try {
    const {status} = req.headers;
    const {userId} = req.tokenData;
    const {limit, offset} = req.body;
    const contests = await Contest.findAll({
      where: { status, userId },
      limit,
      offset: offset ? offset : 0,
      order: [['id', 'DESC']],
      include: [
        {
          model: Offer,
          required: false,
          attributes: ['id'],
        },
      ],
    })
    contests => {contests.forEach(contest => contest.dataValues.count = contest.dataValues.Offers.length)}; 
    const haveMore = contests.length === 0 ? false : true;
    res.send({ contests, haveMore });
  } catch (error) {
    next(new ServerError(error));
  }
};

module.exports.getCreativeContests = async (req, res, next) => {
  try {
    const {userId} = req.tokenData;
    const {typeIndex, contestId, industry, awardSort, limit, offset, ownEntries} = req.body;
    const {where, order} = createWhereForAllContests(typeIndex, contestId, industry, awardSort);
    const contests = await Contest.findAll({ 
        where,
        order,
        limit,
        offset: offset ? offset : 0,
        include: [
          {
            model: Offer,
            required: ownEntries,
            where: ownEntries ? { userId } : {},
            attributes: ['id'],
          },
        ],
      });
      contests => {contests.forEach(contest => contest.dataValues.count = contest.dataValues.Offers.length)}; 
      const haveMore = contests.length === 0 ? false : true;
      res.send({ contests, haveMore });
  } catch (error) {
    next(new ServerError(error));
  }
};