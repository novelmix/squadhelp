const CONSTANTS = require('../constants');
module.exports = async (req, res, next) => {
  try {
    const {
      query: { limit, offset },
    } = req;
    req.pagination = {
      limit:
        !limit || limit <= 0 || limit > CONSTANTS.MAX_LIMIT
          ? CONSTANTS.MAX_LIMIT
          : limit,
      offset: !offset || offset <= 0 ? 0 : offset,
    };
    next();
  } catch (err) {
    next(err);
  }
};
