const NotFoundError = require('../errors/NotFoundError');
const { Catalog, Conversation } = require('../models');

module.exports.catalogCreation = async (data, transaction) => {
  const catalog = await Catalog.create(data, { transaction });
  if (!catalog) throw new ServerError('server error on catalog creation');
  return catalog.get({ plain: true });
};
module.exports.findOneCatalog = async (predicate, transaction) => {
  const catalog = await Catalog.findOne(predicate, { transaction });
  if (!catalog) throw new NotFoundError('catalog is not found');
  return catalog;
};
module.exports.findAllCatalogsFromChat = async (userId) => {
  const catalogs = await Catalog.findAll({
    where: {
      userId,
    },
    include: {
      model: Conversation,
      attributes: ['id'],
    },
  });
  return catalogs.map((el) => el.get({ plain: true }));
};
