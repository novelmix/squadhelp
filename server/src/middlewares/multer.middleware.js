const path = require('path');
const multer = require('multer');
const { DEV_FILES_PATH } = require('../constants');
const { createPublicFolder } = require('../utils/functions');
const env = process.env.NODE_ENV || 'development';
const devFilePathImage = path.resolve(DEV_FILES_PATH, 'images');
const devFilePathContest = path.resolve(DEV_FILES_PATH, 'contestFiles');
const filePathImage =
  env === 'production' ? '/var/www/html/images/' : devFilePathImage;
const filePathContest =
  env === 'production' ? '/var/www/html/contestFiles/' : devFilePathContest;

createPublicFolder(filePathImage);
createPublicFolder(filePathContest);

const storageImageFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, filePathImage);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, filePathContest);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const multerInstanceImageFiles = multer({ storage: storageImageFiles });
const multerInstanceContestFiles = multer({ storage: storageContestFiles });

module.exports.uploadAvatar = multerInstanceImageFiles.single('file');
module.exports.updateContestFile = multerInstanceContestFiles.single('file');
module.exports.uploadContestFiles = multerInstanceContestFiles.array(
  'files',
  3
);
module.exports.uploadLogoFiles = multerInstanceImageFiles.single('offerData');
