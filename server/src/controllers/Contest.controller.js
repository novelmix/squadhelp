const { Contest, Rating, Offer, User } = require('../models');
const { updateContest, createWhereForAllContests }= require('../services/contest.service');
const { findAllByTypes } = require('../services/select.service')
const CONSTANTS = require('../constants');
const ServerError = require('../errors/ServerError');

module.exports.dataForContest = async (req, res, next) => {
  try {
    const { body: { characteristic1, characteristic2 } } = req;
    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);
    const response = await findAllByTypes(types)
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
            ? { userId: req.tokenData.id }
            : {moderatorStatus: 'confirmed'},
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
              where: { userId: req.tokenData.id },
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
      userId: req.tokenData.id,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  try {
    const {status} = req.headers;
    const {id} = req.tokenData;
    const {limit, offset} = req.body;
    const contests = await Contest.findAll({
      where: { status, userId: id },
      limit,
      offset: offset ? offset : 0,
      order: [['id', 'DESC']],
      include: [
        {
          model: Offer,
          required: false,
          attributes: ['id'],
          where: {moderatorStatus: 'confirmed'}
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
    const {id} = req.tokenData;
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
            where: ownEntries ? { userId: id } : {},
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