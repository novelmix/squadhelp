const { Select, Sequelize } = require('../models');
const ServerError = require('../errors/ServerError');

module.exports.findAllByTypes = async (types) => {
  let response = {};
  const characteristics = await Select.findAll({
    where: {
      type: {
        [Sequelize.Op.or]: types,
      },
    },
  });
  if (!characteristics) {
    return next(new ServerError());
  }
  characteristics.forEach((characteristic) => {
    if (!response[characteristic.type]) {
      response[characteristic.type] = [];
    }
    response[characteristic.type].push(characteristic.describe);
  });
  return response;
};
