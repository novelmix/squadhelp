const { Router } = require('express');
const authController = require('../middlewares/auth.middleware');
const chatController = require('../controllers/Chat.controller');
const chat = Router();

chat.use(authController.checkToken);
chat.get('/getPreview', chatController.getPreview);
chat.get('/getChat/:interlocutorId', chatController.getChat);
chat.post('/newMessage', chatController.addMessage);
chat.patch('/changeChatBlock', chatController.blackList);
chat.patch('/changeChatFavorite', chatController.favoriteChat);
chat.post('/createCatalog', chatController.createCatalog);
chat.patch('/updateNameCatalog/:catalogId', chatController.updateNameCatalog);
chat.put('/addNewChatToCatalog/:catalogId', chatController.addNewChatToCatalog);
chat.delete('/deleteCatalog/:catalogId', chatController.deleteCatalog);
chat.get('/getCatalogList', chatController.getCatalogs);
chat.delete(
  '/removeChatFromCatalog/:catalogId/:chatId',
  chatController.removeChatFromCatalog
);

module.exports = chat;
