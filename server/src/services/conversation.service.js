const { Conversation, Sequelize, Message } = require('../models');

module.exports.findAllConversationsForPreviewChat = async (userId) => {
  const conversations = await Conversation.findAll({
    where: {
      participants: { [Sequelize.Op.contains]: [userId] },
    },
    include: {
      model: Message,
      order: [['created_at', 'desc']],
      limit: 1,
    },
  });

  return conversations.map((el) => el.get({ plain: true }));
};

module.exports.findConversation = async (predicate, transaction) => {
  const conversation = await Conversation.findOne({where: predicate, transaction});
  return conversation; 
};

module.exports.findOrCreateConversationForMessage = async(predicate, transaction) => {
  const [conversation] = await Conversation.findOrCreate({
    where: predicate,
    defaults: predicate,
    transaction,
  });

  return conversation; 
}

module.exports.returnPreviewObj = (conversations, senders) => {
  conversations.forEach((conversation) => {
    const {
      Messages: [message],
    } = conversation;
    conversation.sender = message ? message.userId : null;
    conversation.text = message ? message.body : null;
    conversation.createAt = message ? message.createdAt : null;
    senders.forEach((sender) => {
      if (conversation.participants.includes(sender.id)) {
        conversation.interlocutor = {
          id: sender.id,
          firstName: sender['first_name'],
          lastName: sender['last_name'],
          displayName: sender['display_name'],
          avatar: sender.avatar,
        };
      }
      delete conversation.Messages;
    });
  });
  return conversations;
};
module.exports.returnChatObj = (messages, interlocutor) => {
  return {
    messages,
    interlocutor: {
      firstName: interlocutor.firstName,
      lastName: interlocutor.lastName,
      displayName: interlocutor.displayName,
      id: interlocutor.id,
      avatar: interlocutor.avatar,
    },
  };
};
