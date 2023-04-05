const { Router } = require('express');
const { passwordHash, checkAuth } = require('../middlewares/auth.middleware');
const { registration, login } = require('../controllers/Auth.controller');
const {
  validateRegistrationData,
  validateLogin,
} = require('../middlewares/validator.middleware');

const auth = Router();

auth.post(
  '/registration',
  validateRegistrationData,
  passwordHash,
  registration
);
auth.post('/login', validateLogin, login);
auth.post('/getUser', checkAuth);

module.exports = auth;
