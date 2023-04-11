const { Router } = require('express');
const {
  addMessage,
  getChat,
  getPreview,
  blackList,
  favoriteChat,
  createCatalog,
  updateNameCatalog,
  addNewChatToCatalog,
  removeChatFromCatalog,
  deleteCatalog,
  getCatalogs,
} = require('../controllers/Chat.controller');
const { checkToken } = require('../middlewares/auth.middleware');

const chat = Router();

chat.get('/getPreview', checkToken, getPreview);
chat.get('/getChat/:interlocutorId', checkToken, getChat);
chat.post('/newMessage', checkToken, addMessage);
chat.patch('/changeChatBlock', checkToken, blackList);
chat.patch('/changeChatFavorite', checkToken, favoriteChat);
chat.post('/createCatalog', checkToken, createCatalog);
chat.patch('/updateNameCatalog/:catalogId', checkToken, updateNameCatalog);
chat.put('/addNewChatToCatalog/:catalogId', checkToken, addNewChatToCatalog);
chat.delete('/removeChatFromCatalog/:catalogId/:chatId', checkToken, removeChatFromCatalog);
chat.delete('/deleteCatalog/:catalogId', checkToken, deleteCatalog);
chat.get('/getCatalogList', checkToken, getCatalogs);

module.exports = chat;
