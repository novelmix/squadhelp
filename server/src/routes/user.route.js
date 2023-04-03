const { Router } = require('express');
const { checkToken } = require('../middlewares/auth.middleware');
const {
  payment,
  changeMark,
  updateUser,
  cashout,
} = require('../controllers/User.controller');
const {
  onlyForCustomer,
  parseBody,
  onlyForCreative,
} = require('../middlewares/basic.middleware');
const {
  validateContestCreation,
} = require('../middlewares/validator.middleware');
const { uploadContestFiles, uploadAvatar } = require('../utils/fileUpload');

const user = Router();

user.post('/changeMark', checkToken, onlyForCustomer, changeMark);
user.post('/updateUser', checkToken, uploadAvatar, updateUser);
user.post('/cashout', checkToken, onlyForCreative, cashout);
user.post(
  '/pay',
  checkToken,
  onlyForCustomer,
  uploadContestFiles,
  parseBody,
  validateContestCreation,
  payment,
);

module.exports = user;
