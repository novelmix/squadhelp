const http = require('http');
const express = require('express');
const cors = require('cors');
const { connect } = require('./config/mongoose');
const routes = require('./routes/index');
const controller = require('./socketInit');
const errorHandler = require('./error.handler');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(routes);
app.use(errorHandler);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
connect();
controller.createConnection(server);
