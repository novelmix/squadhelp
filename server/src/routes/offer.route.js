const { Router } = require('express');
const {
  setNewOffer,
  setOfferStatus,
  getOffersForModerator,
  updateOfferForModerator,
} = require('../controllers/Offer.controller');
const { checkToken } = require('../middlewares/auth.middleware');
const { uploadLogoFiles } = require('../config/multer');
const {
  canSendOffer,
  onlyForCustomerWhoCreateContest,
  onlyForModerator,
} = require('../middlewares/basic.middleware');
const pagination = require('../middlewares/pagination.middleware');

const offer = Router();

offer.get('/', checkToken, onlyForModerator, pagination, getOffersForModerator);
offer.patch('/:offerId', checkToken, onlyForModerator, updateOfferForModerator);
offer.post(
  '/setNewOffer',
  checkToken,
  uploadLogoFiles,
  canSendOffer,
  setNewOffer
);
offer.post(
  '/setOfferStatus',
  checkToken,
  onlyForCustomerWhoCreateContest,
  setOfferStatus
);

module.exports = offer;
