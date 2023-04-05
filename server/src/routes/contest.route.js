const { Router } = require('express');
const {
  dataForContest,
  getCustomersContests,
  getContestById,
  downloadFile,
  updateContest,
  getCreativeContests,
} = require('../controllers/Contest.controller');
const {
  canGetContest,
  onlyForCreative,
  onlyForCustomer,
} = require('../middlewares/basic.middleware');
const { checkToken } = require('../middlewares/auth.middleware');
const { updateContestFile } = require('../config/multer');
const contest = Router();

contest.post('/dataForContest', checkToken, dataForContest);
contest.post('/getCustomersContests', checkToken, onlyForCustomer, getCustomersContests);
contest.get('/getContestById', checkToken, canGetContest, getContestById);
contest.post('/getCreativeContests', checkToken, onlyForCreative, getCreativeContests);
contest.get('/downloadFile/:fileName', checkToken, downloadFile);
contest.post('/updateContest', checkToken, updateContestFile, updateContest);

module.exports = contest;
