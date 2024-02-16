// const express = require("express");
// const app = express();
// const serverConfig = require("./config/serverConfig");
// const PORT = process.env.PORT || 3001;

// const indexRouter = require('./routes/index.routes')


// serverConfig(app);
// app.use('/', indexRouter)

// app.listen(PORT, () => {
//   console.log(`Этот сервер умирает на ${PORT} порту`);
// });

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const serverConfig = require("./config/serverConfig");
const PORT = process.env.PORT || 3001;

const indexRouter = require('./routes/index.routes');

// Настройка сервера
serverConfig(app);
app.use('/', indexRouter);

// Создание WebSocket сервера
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    
    // Отправка сообщения обратно всем подключенным клиентам
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send('Брат мой, у тебя получилось подключиться к WebSocket серверу');
});

// Замените app.listen на server.listen
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
