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

chat.post('/newMessage', checkToken, addMessage);
chat.post('/getChat', checkToken, getChat);
chat.post('/getPreview', checkToken, getPreview);
chat.post('/blackList', checkToken, blackList);
chat.post('/favorite', checkToken, favoriteChat);
chat.post('/createCatalog', checkToken, createCatalog);
chat.post('/updateNameCatalog', checkToken, updateNameCatalog);
chat.post('/addNewChatToCatalog', checkToken, addNewChatToCatalog);
chat.post('/removeChatFromCatalog', checkToken, removeChatFromCatalog);
chat.post('/deleteCatalog', checkToken, deleteCatalog);
chat.post('/getCatalogs', checkToken, getCatalogs);

module.exports = chat;
