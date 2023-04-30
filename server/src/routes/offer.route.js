const { Router } = require('express');
const offerController = require('../controllers/Offer.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const basicMiddleware = require('../middlewares/basic.middleware');
const paginationMiddleware = require('../middlewares/pagination.middleware');
const multerMiddleware = require('../middlewares/multer.middleware');
const offer = Router();

offer.use(authMiddleware.checkToken);
offer.get(
  '/moderator',
  basicMiddleware.onlyForModerator,
  paginationMiddleware,
  offerController.getOffersForModerator
);
offer.patch(
  '/moderator/:offerId',
  basicMiddleware.onlyForModerator,
  offerController.updateOfferForModerator
);
offer.post(
  '/:contestId/addOffer',
  basicMiddleware.canSendOffer,
  multerMiddleware.uploadLogoFiles,
  offerController.setNewOffer
);
offer.patch(
  '/setOfferStatus',
  basicMiddleware.onlyForCustomerWhoCreateContest,
  offerController.setOfferStatus
);

module.exports = offer;
