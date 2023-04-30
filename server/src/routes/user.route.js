const { Router } = require('express');
const userController = require('../controllers/User.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const basicMiddleware = require('../middlewares/basic.middleware');
const validatorMiddleware = require('../middlewares/validator.middleware');
const multerMiddleware = require('../middlewares/multer.middleware');

const user = Router();

user.use(authMiddleware.checkToken);
user.put(
  '/updateUser',
  multerMiddleware.uploadAvatar,
  userController.updateUser
);
user.post(
  '/cashout',
  basicMiddleware.onlyForCreative,
  basicMiddleware.checkBalanceCard,
  userController.cashout
);
user.patch(
  '/changeMark',
  basicMiddleware.onlyForCustomer,
  userController.changeMark
);
user.post(
  '/pay',
  basicMiddleware.onlyForCustomer,
  multerMiddleware.uploadContestFiles,
  basicMiddleware.parseBody,
  validatorMiddleware.validateContestCreation,
  basicMiddleware.checkBalanceCard,
  userController.payment
);

module.exports = user;
