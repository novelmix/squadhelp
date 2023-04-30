const { Router } = require('express');
const auth = require('./auth.route');
const user = require('./user.route');
const contest = require('./contest.route');
const offer = require('./offer.route');
const chat = require('./chat.route');
const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/contests', contest);
routes.use('/offers', offer);
routes.use('/chats', chat);

module.exports = routes;
