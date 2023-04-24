const ejs = require('ejs');
const path = require('path');
const { transporter } = require('../config/mailer');
const { errorLogger } = require('../config/winston');
const CONSTANTS = require('../constants');
const from =
  process.env.NODE_ENV === 'production' ? '' : CONSTANTS.MAIL_SEND_DEV;

module.exports.sendEmailForCreatorByModerator = async (options) => {
  const file = path.resolve(
    __dirname,
    '../templates/email/forCreationByModerator.ejs'
  );
  const html = await ejs.renderFile(file, {options, url: CONSTANTS.publicURL});
  const emailOptions = {
    from,
    to: options.email,
    subject: "Our team's Squadhelp solutions for your offer",
    html,
  };
  await transporter.sendMail(emailOptions, (error, info) => {
    error ? errorLogger.error(error) : info.messageId;
  });
};
