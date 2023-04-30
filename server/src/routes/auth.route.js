const { Router } = require('express');
const authController = require('../controllers/Auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validatorMiddleware = require('../middlewares/validator.middleware');
const auth = Router();

auth.post(
  '/registration',
  validatorMiddleware.validateRegistrationData,
  authMiddleware.passwordHash,
  authController.registration
);
auth.post('/login', validatorMiddleware.validateLogin, authController.login);
auth.post('/checkAuth', authMiddleware.checkAuth);

module.exports = auth;
