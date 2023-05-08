const nodemailer = require('nodemailer');
const CONSTANTS = require('../constants');
//!!todo setting email auth
const config =
  process.env.NODE_ENV === 'production'
    ? {
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: '',
        pass: '',
      },
    }
    : {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: CONSTANTS.MAIL_SEND_DEV,
        pass: CONSTANTS.MAIL_SEND_DEV_PASSWORD,
      },
    };
module.exports.transporter = nodemailer.createTransport(config);
