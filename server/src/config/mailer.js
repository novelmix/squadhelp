const nodemailer = require('nodemailer');
const CONSTANTS = require('../constants');

const config =
  process.env.NODE_ENV === 'production'
    ? {
        //setting config
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
