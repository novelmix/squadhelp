const path = require('path');
const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 3000;
module.exports = {
  ACCESS_JWT_SECRET: 'asdasdasd4as5d4as8d7a8sd4as65d4a8sd7asd4as56d4',
  ACCESS_TOKEN_TIME: 60 * 30,
  REFRESH_TOKEN_TIME: 60 * 60,
  REFRESH_JWT_SECRET: 'ggqeqszz44231321qweqdzxczczscsqcwqcqdasdasd4as5d4as8d7a8sd4as65d4a8sd7asd4as56d4',
  SALT_ROUNDS: 5,
  SQUADHELP_BANK_NUMBER: '4564654564564564',
  SQUADHELP_BANK_NAME: 'SquadHelp',
  SQUADHELP_BANK_CVC: '453',
  SQUADHELP_BANK_EXPIRY: '11/22',
  MAIL_SEND_DEV: 'reid.kutch53@ethereal.email',
  MAIL_SEND_DEV_PASSWORD: 'tZ1Mw6zHUdvppMnssp',
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  MODERATOR: 'moderator',
  CREATOR_ENTRIES: 'creator_entries',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  CONTESTS_DEFAULT_DIR: 'public/contestFiles/',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_PENDING: 'pending',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_WON: 'won',
  publicURL:
    env === 'production'
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/public/images/`,
  DEV_FILES_PATH: path.resolve(__dirname, '..', 'public'),
  LOGS_DEFAULT_DIR: path.resolve(__dirname, '..', '_logs/_logsDaily'),
  LOGS_FILENAME: 'error.log',
  SCHEDULE_TIME: '00 00 09 * * *',
  SOCKET_CONNECTION: 'connection',
  SOCKET_SUBSCRIBE: 'subscribe',
  SOCKET_UNSUBSCRIBE: 'unsubscribe',
  NOTIFICATION_ENTRY_CREATED: 'onEntryCreated',
  NOTIFICATION_CHANGE_MARK: 'changeMark',
  NOTIFICATION_CHANGE_OFFER_STATUS: 'changeOfferStatus',
  NEW_MESSAGE: 'newMessage',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  MAX_LIMIT: 8,
  TYPES_FOR_CONTESTS: [
    '',
    'name,tagline,logo',
    'name',
    'tagline',
    'logo',
    'name,tagline',
    'logo,tagline',
    'name,logo',
  ]
};
