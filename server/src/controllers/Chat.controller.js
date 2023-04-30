const {
  Conversation,
  Catalog,
  CatalogToConversations,
  sequelize,
} = require('../models');
const {
  findUser,
  findUsersForPreviewChat,
} = require('../services/user.service');
const { messageCreation } = require('../services/message.service');
const {
  catalogCreation,
  findOneCatalog,
  findAllCatalogsFromChat,
} = require('../services/catalog.service');
const controller = require('../socketInit');
const {
  findConversation,
  findOrCreateConversationForMessage,
  returnChatObj,
  returnPreviewObj,
  findAllConversationsForPreviewChat,
} = require('../services/conversation.service');

module.exports.getPreview = async (req, res, next) => {
  try {
    const { id } = req.tokenData;
    const conversations = await findAllConversationsForPreviewChat(id);
    const interlocutors = [];
    conversations.forEach((conversation) => {
      interlocutors.push(
        conversation.participants.find((participant) => participant !== id)
      );
    });
    const senders = await findUsersForPreviewChat(interlocutors);
    const preview = returnPreviewObj(conversations, senders);
    res.status(200).send(preview);
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const { id } = req.tokenData;
    const { interlocutorId } = req.params;
    const participants = [id, interlocutorId].sort((p1, p2) => p1 - p2);
    const conversation = await findConversation({ participants });
    const interlocutor = await findUser({ id: interlocutorId });
    res
      .status(200)
      .send(
        returnChatObj(
          conversation ? await conversation.getMessages() : [],
          interlocutor
        )
      );
  } catch (err) {
    next(err);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { id, firstName, lastName, displayName, avatar, email } =
      req.tokenData;
    const { recipient: interlocutorId, messageBody, interlocutor } = req.body;
    const participants = [id, interlocutorId].sort((p1, p2) => p1 - p2);
    const result = await sequelize.transaction(async (t) => {
      const conversation = await findOrCreateConversationForMessage(
        { participants },
        t
      );
      const message = await messageCreation(
        {
          userId: id,
          body: messageBody,
          conversationId: conversation.id,
        },
        t
      );
      message.participants = participants;
      const preview = {
        id: conversation.id,
        sender: id,
        text: messageBody,
        createAt: message.createdAt,
        participants,
        blackList: conversation.blackList,
        favoriteList: conversation.favoriteList,
      };

      controller.getChatController().emitNewMessage(interlocutorId, {
        message,
        preview: {
          ...preview,
          interlocutor: {
            id,
            firstName,
            lastName,
            displayName,
            avatar,
            email,
          },
        },
      });

      return [message, preview];
    });
    const [message, preview] = result;
    res.status(201).send({
      message,
      preview: { ...preview, interlocutor },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    const { id } = req.tokenData;
    const { participants, blackListFlag } = req.body;
    const result = await sequelize.transaction(async (t) => {
      const conversation = await findConversation({ participants }, t);
      const blackList = conversation.blackList;
      blackList[conversation.participants.indexOf(id)] = blackListFlag;
      await Conversation.update(
        { blackList },
        { where: { id: conversation.id }, transaction: t }
      );
      const [interlocutorId] = conversation.participants.filter(
        (participant) => participant !== id
      );
      controller
        .getChatController()
        .emitChangeBlockStatus(interlocutorId, conversation);

      return conversation;
    });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const { id } = req.tokenData;
    const { participants, favoriteFlag } = req.body;
    const conversation = await findConversation({ participants });
    const favoriteList = conversation.favoriteList;
    favoriteList[conversation.participants.indexOf(id)] = favoriteFlag;
    await Conversation.update(
      { favoriteList },
      { where: { id: conversation.id } }
    );
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const { id: userId } = req.tokenData;
    const { catalogName: name, chatId } = req.body;
    const newCatalog = await catalogCreation({ userId, name });
    await CatalogToConversations.create({
      conversationId: chatId,
      catalogId: newCatalog.id,
    });
    const catalog = { ...newCatalog, chats: [chatId] };
    res.status(201).send(catalog);
  } catch (error) {
    next(error);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { id: userId } = req.tokenData;
    const { catalogId } = req.params;
    const { catalogName } = req.body;
    const catalog = await findOneCatalog({
      where: { id: catalogId, userId },
    });
    const conversations = await catalog.getConversations();
    await catalog.update({ name: catalogName });
    const objCatalog = {
      id: catalog.id,
      name: catalog.name,
      chats: conversations.map((c) => c.id),
    };
    res.status(200).send(objCatalog);
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const { id } = req.tokenData;
    const catalogs = await findAllCatalogsFromChat(id);
    catalogs.forEach((catalog) => {
      catalog.chats = catalog.Conversations.map((c) => c.id);
      delete catalog.Conversations;
    });
    res.status(200).send(catalogs);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const { id: userId } = req.tokenData;
    const { catalogId: id } = req.params;
    const { chatId, catalogId } = req.body;
    const catalog = await findOneCatalog({ where: { id, userId } });
    const conversations = await catalog.getConversations();
    await CatalogToConversations.create({
      conversationId: chatId,
      catalogId: catalogId,
    });

    const objCatalog = {
      id: catalog.id,
      name: catalog.name,
      chats: conversations.map((c) => c.id),
    };
    objCatalog.chats.push(chatId);
    res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { id: userId } = req.tokenData;
    const { catalogId: id, chatId } = req.params;
    const catalog = await findOneCatalog({ where: { id, userId } });
    const conversations = await catalog.getConversations();
    conversations.map(async (conversation) => {
      if (conversation.id === Number(chatId)) {
        await catalog.removeConversation(conversation.id);
      }
    });
    const objCatalog = {
      id: catalog.id,
      name: catalog.name,
      chats: conversations
        .map((c) => c.id)
        .filter((id) => id !== Number(chatId)),
    };
    res.status(200).send(objCatalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOne({
      where: {
        id: req.params.catalogId,
        userId: req.tokenData.id,
      },
    });
    await catalog.destroy();
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};
