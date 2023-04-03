const { Router } = require('express');
const {
  dataForContest,
  getCustomersContests,
  getContestById,
  getContests,
  downloadFile,
  updateContest,
  setNewOffer,
  setOfferStatus,
} = require('../controllers/Contest.controller');
const {
  canGetContest,
  onlyForCreative,
  canSendOffer,
  onlyForCustomerWhoCreateContest,
} = require('../middlewares/basic.middleware');
const { checkToken } = require('../middlewares/auth.middleware');
const { updateContestFile, uploadLogoFiles } = require('../utils/fileUpload');
const contest = Router();

contest.post('/dataForContest', checkToken, dataForContest);
contest.post('/getCustomersContests', checkToken, getCustomersContests);
contest.get('/getContestById', checkToken, canGetContest, getContestById);
contest.post('/getAllContests', checkToken, onlyForCreative, getContests);
contest.get('/downloadFile/:fileName', checkToken, downloadFile);
contest.post('/updateContest', checkToken, updateContestFile, updateContest);
contest.post(
  '/setNewOffer',
  checkToken,
  uploadLogoFiles,
  canSendOffer,
  setNewOffer,
);
contest.post(
  '/setOfferStatus',
  checkToken,
  onlyForCustomerWhoCreateContest,
  setOfferStatus,
);

module.exports = contest;
