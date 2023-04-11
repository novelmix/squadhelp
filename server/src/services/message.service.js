const { Message } = require('../models');

module.exports.messageCreation = async (data, transaction) => {
  const message = await Message.create(data, { transaction });
  if (!message) throw new ServerError('server error on message creation');
  return message.get({ plain: true });
};
