const { Router } = require('express');
const { setNewOffer, setOfferStatus } = require('../controllers/Offer.controller')
const { checkToken } = require('../middlewares/auth.middleware');
const { uploadLogoFiles } = require('../config/multer')
const { canSendOffer, onlyForCustomerWhoCreateContest } = require('../middlewares/basic.middleware')

const offer = Router();

offer.post(
  '/setNewOffer', checkToken, uploadLogoFiles, canSendOffer, setNewOffer); 
  offer.post(
  '/setOfferStatus', checkToken, onlyForCustomerWhoCreateContest, setOfferStatus);

module.exports = offer;
