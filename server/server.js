const express = require('express');
const expressWs = require('express-ws');
const setupWebsockets = require('./ws');
const app = express();
const rooms = new Map();

// Setup WebSockets
setupWebsockets(app, rooms);

const indexRouter = require('./routes/index.routes');
app.use('/', indexRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Этот сервер умирает на ${PORT} порту`);
});
