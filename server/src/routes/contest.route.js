const { Router } = require('express');
const contestController = require('../controllers/Contest.controller');
const authController = require('../middlewares/auth.middleware');
const basicMiddlaware = require('../middlewares/basic.middleware');
const multerMiddleware = require('../middlewares/multer.middleware');
const paginationMiddleware = require('../middlewares/pagination.middleware');
const contest = Router();

contest.use(authController.checkToken);
contest.get('/dataForContest/:contestType', contestController.dataForContest);
contest.get('/downloadFile/:fileName', contestController.downloadFile);
contest.get(
  '/getCustomersContests/:status',
  basicMiddlaware.onlyForCustomer,
  paginationMiddleware,
  contestController.getCustomersContests,
);
contest.get(
  '/getContestById/:contestId',
  basicMiddlaware.canGetContest,
  contestController.getContestById,
);
contest.get(
  '/getCreativeContests',
  basicMiddlaware.onlyForCreative,
  paginationMiddleware,
  contestController.getCreativeContests,
);
contest.put(
  '/updateContest',
  multerMiddleware.updateContestFile,
  basicMiddlaware.canUpdateContest,
  contestController.updateContest,
);

module.exports = contest;
