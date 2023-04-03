const express = require('express');
const auth = require('./auth.route');
const user = require('./user.route');
const contest = require('./contest.route');
const chat = require('./chat.route');

const routes = express.Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/contests', contest);
routes.use('/chats', chat);

module.exports = routes;